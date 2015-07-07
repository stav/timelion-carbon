from fabric.api import local, run, cd, task, env

env.hosts = ['cowboy']


@task
def commit():
    local('git commit -a')


@task
def deploy():
    local('git push')
    with cd('/srv/centerstar.org/timelion-carbon'):
        run("git pull")
