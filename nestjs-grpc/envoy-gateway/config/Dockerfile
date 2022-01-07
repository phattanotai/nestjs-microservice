FROM envoyproxy/envoy-dev
RUN  apt update \ 
    && apt install -y curl
COPY ./envoy.yaml /etc/envoy/envoy.yaml
EXPOSE 8005 8001
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml