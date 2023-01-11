<p align="center">
  <h3 align="center">Observability workshop</h3>
</p>

## About The Project

Repository to show and practice observability tools

### Built With

* [NestJS](https://nestjs.com/)
* [Alert Manager](https://github.com/prometheus/alertmanager)
* [Prometheus](https://prometheus.io/)
* [ELK Stack](https://www.elastic.co/)
* [Grafana](https://grafana.com/)
* [Sentry](https://sentry.io/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/engine/reference/commandline/compose/)
* [NodeJs](https://nodejs.org/en/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yscr-personal/nestjs-observability.git
   ```

## Usage

```sh
ELK_VERSION=8.5.3 docker-compose up
```

## Testing

- **NestJS**: http://localhost:3333
- **Alert Manager** http://localhost:9093
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000
  - username: admin
  - password: grafanapw
- **Elastic Search Logs**: http://localhost:5601/app/logs/stream
- **Postgres**: http://localhost:5432

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
