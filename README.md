# CloudFunctionPubSub

A simple project showing how to implement a GCP cloud function triggered by a Pub/Sub topic.

## Contents 

- function for sending an email is exported in the main module app.js
- Pub/Sub triggers the function and payload is served in event.data
- function awaits a JSON payload with structure: `{user: "username", subject: "subject"}`
- function send an email using credentials, sender and receiver from the config file (see config.js.example)
- function writes a log to stdout after the mail was sent, you can look it up at the GCP console

## Deploying and testing

To deploy run: `gcloud functions deploy sendMail --region europe-west1 --runtime nodejs10 --trigger-topic sendMail`. 

This will:
- create & deploy the cloud function named "sendMail"
- create a new Pub/Sub topic "sendMail" if not present
- automatically add the cloud function as subscriber for this topic

To test run: `gcloud pubsub topics publish sendMail --message "{\"user\": \"testuser 2\", \"subject\": \"hello, cloud functions\"}"`.

- check the inbox provided in config.js.mailTo
- check the GCP logs