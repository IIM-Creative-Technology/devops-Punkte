# Devops

- [Environnement de production](http://163.172.186.220)  
- [Environnement de staging](http://163.172.167.248)  

## Environnement de développement
Le fichier [`docker-compose`](./docker-compose.yml) placé à la racine du projet ne sert qu'à lancer l'environnement de développement en local.  
Copier le contenu du fichier [`.env.example`](./.env.example) dans un fichier `.env` avant de lancer la commande: 
```bash
$ docker-compose up
```
Le client utilise le Dockerfile dédié au **développement** situé dans le dossier [client](./client)  
Le serveur utilise le Dockerfile dédié au **développement** situé dans le dossier [server](./server)  
La base de donnée utilise le Dockerfile de **production** situé dans le dossier [containers](./containers)  

## Environnement de production

Les `Dockerfiles` du client, du serveur et de la base de données sont situés dans le dossier [containers](./containers).  
Le fichier `docker-compose.yml` utilisé en production est situé dans le dossier `templates` du role ansible `sites` : [./ansible/roles/sites/templates/](./ansible/roles/sites/templates/).  
  
En production ou en staging :  
* Le client tourne sur le port 80 et fait tourner une image `nginx` dont la configuration se situe dans le fichier [./client/conf/default.conf](./client/conf/default.conf)
* Le serveur tourne sur le port 3000 mais il est aussi possible d'y accéder grâce au reverse proxy du client; le port 3000 du serveur est mappé sur la route `/api` on peut donc y accéder depuis le client en faisant une requête sur `/api/`
* La base de données n'est accessible que par le serveur et non publiquement sur le port `3306`

### Workflow

![datatube repo](./docs/datatube-repo.png)

À chaque push ou pull-request la CI est lancé.  
Les stages sont les suivants :
  * lint (server)
  * security audit (server)
  * test (client)

Si la branche est la master ou la staging le CD est lancé pour build toutes les images à savoir :
  * datatube_client_{production|staging}
  * datatube_api_{production|staging}
  * datatube_db_{production|staging}
  
Les 3 builds sont lancés côté runner.  
Une fois que c'est fait le playbook ansible correspondant à la branche est lancé pour déployer l'application.

### Hebergement
À part Github aucun service tiers n'est utilisé pour déployer l'application.   
Les instances de production et de pré-production sont hebergées sur [Scaleway](https://www.scaleway.com/en/).  

### Automatisation
Il y'a 2 roles ansible installés avec la commande :
```
ansible-galaxy role install -r requirements.yml -p ./roles
```  
et 1 role [`sites`](./ansible/roles/sites) pour lancer les containers via `docker_compose` sur les machines distantes.  

### Améliorations ou optimisations :thinking:

* [ ] Le build des images docker pourrait être fait côté Ansible :question:
* [ ] On devrait pouvoir cibler quels images builder en fonction du commit 
* [ ] Plutot que d'utiliser 6 images différentes pour 2 environnement on pourrait se contenter du système de tag et de version pour ne créer plus que 3 images différentes pour n environnements
* [ ] Déployer la base de données sur un serveur externe ([https://www.scaleway.com/fr/database/](https://www.scaleway.com/fr/database/)) plutot que sur une image Docker
* [ ] Gérer les instances avec un outil comme terraform
* [ ] Gérer toute la partie automation sur une instance master

Toute reco est la bienvenue, vous pouvez ouvrir une PR :raised_hands:
