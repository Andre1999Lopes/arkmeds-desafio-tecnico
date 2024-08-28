## DRIVER'S APP

Project developed with Node.JS and TypeScript using a postgres database on Amazon RDS and Apache Kafka.

The API is deployed on an EC2 instance managed by Elastic Beanstalk.

For it to work locally, it's necessary to configure a Kafka broker, a Kafka topic, and a postgres database.

The postgres database can be set up with the Docker compose file in the project. Just install Docker on your machine and run `docker compose up -d`.

- Note: change the `POSTGRES_DB`, `POSTGRES_PASSWORD`, and `POSTGRES_USER` environment variables to the ones you'll use.

for the Apache Kafka broker, I'm using the [Upstash](https://upstash.com/) platform to create and manage the broker and the topics. Create an account and go to the Kafka screen to start the setup.

After creating the account, just change the `KAFKA_BROKER`, `KAFKA_USERNAME`, `KAFKA_PASSWORD`, and `KAFKA_TOPIC` to the values on the Upstash app.

The project has a Postman collection JSON file. Importing it on Postman will allow you to see the routes and the base URL of the [deployed API](https://arkmeds-node-674b5626bc3c.herokuapp.com/).
