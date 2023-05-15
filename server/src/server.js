const cors = require('cors');
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const server = express();

const PORT = process.env.NODE_PORT || 1337;

const MONGO_URL = 'mongodb://mongo:27017';
const DB_NAME = 'insightdb';

const MAX_RECENT_DATA_COUNT = 300;

const SEVERITY_WEIGHTS = { 
  High: 100, 
  Medium: 70, 
  Low: 40 };

const TYPE_WEIGHTS = {
  vip: 100,
  AttackIndication: 80,
  ExploitableData: 60,
  BrandSecurity: 40,
  DataLeakage: 20,
  Phishing: 10,
};

server.use(express.static(path.join(__dirname, 'public')));

server.use(cors());

server.get('/api/data/:sourceType', async (req, res) => {
    try {
      const sourceType = req.params.sourceType;
      const {dataBySourceType, uniqueSourceTypes} = await getDataBySourceType(sourceType);
  
      if (!dataBySourceType.length) {
        return res.status(404).json({ error: `No data found for source type ${sourceType}` });
      }

      const riskMeter = calculateRiskMeter(dataBySourceType);
  
      const aggregationsByType = aggregateByTypeAndNetworkType(dataBySourceType);
      const aggregationsBySeverity = aggregateBySeverityAndNetworkType(dataBySourceType);
    
      res.json({ filteredAggregations: { aggregationsByType, aggregationsBySeverity }, riskMeter, uniqueSourceTypes });

    } catch (error) {
      console.error('An error occurred:', error);
      if (error instanceof DatabaseConnectionError) {
        res.status(503).json({ error: 'Database connection error' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
});

server.listen(PORT, () => console.log(`server started on port ${PORT}`));

async function getDataBySourceType(sourceType) {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection('eventsCollection');

  const dataBySourceType = await collection.find({ sourceType }).toArray();

  const uniqueSourceTypes = await collection.distinct('sourceType');

  client.close();

  return {dataBySourceType, uniqueSourceTypes};
}

function aggregateBySeverityAndNetworkType(data) {
  const result = {};
  for (const item of data) {
    if (!result[item.severity]) {
      result[item.severity] = {};
    }
    if (!result[item.severity][item.networkType]) {
      result[item.severity][item.networkType] = 0;
    }
    result[item.severity][item.networkType]++;
  }
  return result;
}

function aggregateByTypeAndNetworkType(data) {
  const result = {};
  for (const item of data) {
    if (!result[item.type]) {
      result[item.type] = {};
    }
    if (!result[item.type][item.networkType]) {
      result[item.type][item.networkType] = 0;
    }
    result[item.type][item.networkType]++;
  }
  return result;
}

function calculateRiskMeter(data) {
  const recentDataByDate = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, MAX_RECENT_DATA_COUNT);
  
      const severityCounts = { High: 0, Medium: 0, Low: 0 };
      const typeCounts = { vip: 0,
                           AttackIndication: 0, 
                           ExploitableData: 0, 
                           BrandSecurity: 0, 
                           DataLeakage: 0, 
                           Phishing: 0 };
  
      for (const item of recentDataByDate) {
        severityCounts[item.severity] += 1;
        typeCounts[item.type] += 1;
      }
  
      const severityStrength = (severityCounts.High * SEVERITY_WEIGHTS.High
                                + severityCounts.Medium * SEVERITY_WEIGHTS.Medium 
                                + severityCounts.Low * SEVERITY_WEIGHTS.Low) 
                                / MAX_RECENT_DATA_COUNT;

      const typeStrength = (typeCounts.vip * TYPE_WEIGHTS.vip 
                          + typeCounts.AttackIndication * TYPE_WEIGHTS.AttackIndication 
                          + typeCounts.ExploitableData * TYPE_WEIGHTS.ExploitableData 
                          + typeCounts.BrandSecurity * TYPE_WEIGHTS.BrandSecurity 
                          + typeCounts.DataLeakage * TYPE_WEIGHTS.DataLeakage 
                          + typeCounts.Phishing * TYPE_WEIGHTS.Phishing) 
                          / MAX_RECENT_DATA_COUNT; 
  
      return Math.round(((severityStrength + typeStrength) / 2));
}
