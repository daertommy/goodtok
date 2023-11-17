# Starting in development mode

Goodtok is a [node.js](https://nodejs.org/en/) application, so you'll need to have node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/).

In addition to node.js, we use Docker to run all of our services. You can download Docker from [here](https://www.docker.com/get-started).

Once you have node.js and Docker installed, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/fonoster/goodtok
cd goodtok
npm install
```

Next, you need to create a `.env` file in the root of the project. You can use the `.env.example` file as a template. Here is an example of a `.env` file:

```bash
# General config
APP_URL=http://localhost:8080
API_ENDPOINT=http://localhost:6789/v1
LOGS_LEVEL=verbose

# Initial store owner credentials
#   The server will create a new owner if the email does not exist
#   The password will be updated if the email exists
OWNER_EMAIL=admin@localhost.local
OWNER_PASSWORD=changeme

# SMTP config
SMTP_HOST=smtp.mailgun.org
SMTP_AUTH_USER=postmaster@sandboxaf26cf6082e16728a953f154694cffaa.mailgun.org
SMTP_AUTH_PASS=da2b032430065625e5fa4dcbcf230fef-8c9e823c-fbff4e3b
SMTP_SENDER=Admin <info@example.com>

# SIP signaling config
DOCKER_HOST_ADDRESS=192.168.1.7
SIP_SIGNALING_SERVER=ws://192.168.1.7:5062
SIP_DOMAIN=sip.goodtok.io

# Database and encryption config
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/goodtok
CLOAK_ENCRYPTION_KEY=k1.aesgcm256.MmPSvzCG9fk654bAbl30tsqq4h9d3N4F11hlue8bGAY=
```

In the previous example, we are using [Mailgun](https://www.mailgun.com/) as our SMTP provider. You can use any SMTP provider you want. If you don't have one, you can use [Mailtrap](https://mailtrap.io/).

To start the application in development mode, first you need to start Routr, Postgres, and Nats:

```bash
docker compose -f compose.dev.yaml up nats postgres routr
```

The previous command will start all the services in the foreground. If you want to run them in the background, you can use the `-d` flag:

```bash
docker compose -f compose.dev.yaml up -d nats postgres routr
```

Once the services are up and running, you can start the backend, also known as the APIServer, by running:

```bash
npm run start:apiserver
```

To start the frontend, which we often refer to as the Front Office, you can run: 

```bash
npm run start:frontoffice
```

Finally, to start the demo Widget, you can run:

```bash
npm run start:widget
```

