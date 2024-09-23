import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Forex Data API',
      version: '1.0.0',
      description: 'API for scraping and querying historical exchange data',
      contact: {
        name: 'Vipul Verma',
      },
      servers: [
        {
          url: 'http://localhost:4000',
        },
      ],
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
