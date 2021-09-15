# Pipelines
https://redhat-scholars.github.io/tekton-tutorial/tekton-tutorial/private_reg_repos.html#tekton-push-to-external-reg

## Elevate privs for pipeline sa
// oc adm policy add-scc-to-user anyuid -z pipeline
This one worked last time.
oc adm policy add-scc-to-user privileged -z pipeline

export CONTAINER_REGISTRY_SERVER='https://quay.io' 
export CONTAINER_REGISTRY_USER='<your registry user>'
export CONTAINER_REGISTRY_PASSWORD='<your registry user password>'

kubectl create secret -n <namespace> docker-registry container-registry-secret \
  --docker-server=$CONTAINER_REGISTRY_SERVER \
  --docker-username=$CONTAINER_REGISTRY_USER \
  --docker-password=$CONTAINER_REGISTRY_PASSWORD