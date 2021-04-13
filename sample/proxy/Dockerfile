# use dev image to run on arm64
FROM envoyproxy/envoy-dev
COPY ./envoy.yaml /etc/envoy/envoy.yaml
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
