# Déploiement — Imagine for Margo

Application pour l'association Imagine for Margo (recherche en oncologie pédiatrique) : elle aide la responsable collecte à identifier les donateurs inactifs depuis 13 mois ou plus et à préparer leur cycle de réactivation, isolé du flux général de campagnes.

## Services

Deux services :
- `frontend/` : export statique Next.js servi par nginx sur le port 80, **exposé au public** (8080 côté passerelle).
- `api/` : service Node, port 8081, routes `/health` et `/sante` seulement à ce stade.

## Services externes

Aucun à ce stade (itération 1) : pas d'appel à un modèle d'IA, pas de base de données, pas d'envoi d'e-mail.

## Fragile ou inachevé

- La liste des donateurs est une donnée en dur (itération 1) : aucun CRM réel n'est encore branché.
- Pas de persistance : rien n'est encore stocké côté `api/`.
- Pas de navigation vers la vue 360 du donateur (prévue en itération 2).

## Contacts

Équipe : team34 (hackathon eXaltemps Solidaire, 7CGEWZ). Association : Imagine for Margo.
