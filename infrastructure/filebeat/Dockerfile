ARG ELK_VERSION

FROM docker.elastic.co/beats/filebeat:${ELK_VERSION}

COPY filebeat.yml /usr/share/filebeat/filebeat.yml

USER root

RUN mkdir /usr/share/filebeat/dockerlogs
RUN chown -R root /usr/share/filebeat/
RUN chmod -R go-w /usr/share/filebeat/
