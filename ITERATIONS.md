# Plan d'itérations — Imagine for Margo (7CGEWZ)

**Plan validé le 2026-11-18.**

- **Source du plan** : proposé par l'agent, basé sur le plan de livraison de l'équipe (`passation/cadrage/6-plan-de-livraison.md`) et le prototype (`passation/prototype/index.html`) — aucun fichier `cadrage/*iteration*` ni clé `iterations` dans `passation.json` à reprendre tel quel. `cadrage/3-solution.md` ne décrit pas les écrans (il recopie la fiche de l'idée retenue) : le prototype et le plan de livraison font donc foi pour le découpage.
- **Temps restant annoncé** : 60 minutes, demandé à la planification.
- **Durée d'un tour de test de l'équipe** : 10 minutes (valeur par défaut).
- **Capacité calculée** : une itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (10 min) ≈ 25 min minimum. Sur 60 minutes, cela tient **2 itérations avec marge** (≈ 50 min), pas 3 en toute sécurité (75 min).
- **Hors périmètre** (exclu par l'équipe, `matiere/arbitrages.md` + `PASSATION.md` § Hors périmètre) : cycles des nouveaux donateurs et des donateurs en prélèvement automatique, conversion vers le prélèvement automatique, gestion des entreprises (HubSpot), choix de l'éditeur CRM, refonte du site, formulaire de don iRaiser, règles de pression globale, délivrabilité.
- ⚠️ **Simplification proposée** : l'écran « Qui êtes-vous ? » (sélecteur de persona, requis par `PASSATION.md` pour cette version) sera d'abord un simple badge de rôle repris du prototype (« Responsable collecte »), sans sélecteur multi-persona tant qu'un second rôle n'est pas réellement nécessaire à un écran suivant — à confirmer avec les cadreurs si un autre rôle doit apparaître plus tôt.

---

## Itération 1 : La liste des donateurs à réactiver est en ligne, avec des données en dur

**Temps restant annoncé au début de cette itération** : 60 minutes (inchangé depuis la planification). Capacité confirmée : 2 itérations avec marge.

- **Dans le périmètre** :
  - Contrat de déployabilité restant à poser : `.env.example`, `DEPLOIEMENT.md` (les Dockerfile, `/health` et `/sante` de `api/` et `frontend/` existent déjà dans le gabarit).
  - Écran 1 (`screen-1` du prototype) : liste des 4 donateurs à réactiver, avec nom, dernier don (date + source), raison, badge d'inactivité ou « Cycle en cours », les 2 indicateurs (nombre de profils, envois max évités), données en dur reproduisant le prototype.
- **Hors périmètre** : la vue 360 (écran 2), la séquence du cycle (écran 3), la confirmation (écran 4), tout sélecteur de persona complet.
- **Critères d'acceptation** :
  - Étant donné l'application démarrée, quand on appelle `/health` ou `/sante` sur `frontend` et sur `api`, alors la réponse est 200.
  - Étant donné l'écran principal affiché, quand les 4 donateurs sont rendus, alors chacun montre son nom, son dernier don et son badge d'inactivité ou de cycle en cours.
  - Étant donné un donateur inactif depuis 13 mois ou plus, quand la liste est calculée, alors il apparaît comme éligible à la réactivation (règle du seuil de 13 mois).
- **Hypothèse de l'équipe couverte** : aucune directement — cette itération pose le socle technique et l'écran d'entrée, pas encore un parcours à mesurer.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/lib/donateurs.ts` (données + règle d'éligibilité), `frontend/src/app/page.tsx`, CSS associé (≈5 fichiers).
- **Tests unitaires prévus** : 1 à 3, sur la règle « éligible à la réactivation si ≥ 13 mois d'inactivité et aucun cycle en cours ».
- **Étapes ajoutées à la démo** : ouvrir l'application, vérifier que les 4 donateurs s'affichent avec leurs badges.
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté)_

## Itération 2 : La responsable collecte consulte la vue 360 d'un donateur sélectionné

- **Dans le périmètre** :
  - Navigation depuis la liste (écran 1) vers la vue 360 (écran 2, `screen-2` du prototype) du donateur cliqué.
  - Vue 360 : identité, historique de don résumé (nombre de dons, dernier don, raison, source), statut d'isolation du flux général, lien retour vers la liste.
- **Hors périmètre** : la frise complète des événements et les paragraphes d'impact détaillés (✂️ simplifiés ou reportés si le budget de 10 minutes ne suffit pas), la séquence du cycle (écran 3), la confirmation (écran 4).
- **Critères d'acceptation** :
  - Étant donné la liste affichée, quand on clique un donateur, alors sa vue 360 s'affiche avec son nom, son dernier don et sa raison.
  - Étant donné la vue 360 affichée, quand on clique « Retour », alors on revient à la liste des 4 donateurs.
  - Étant donné un donateur isolé du flux général, quand sa vue 360 s'affiche, alors le message d'isolation apparaît.
- **Hypothèse de l'équipe couverte** : aucune mesure directe encore (prépare H4 : « 1 seul outil consulté » — la vue 360 regroupe l'information sans écran supplémentaire).
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : nouvelle route/page `frontend/src/app/donateur/[id]/page.tsx` (ou équivalent), extension de `frontend/src/lib/donateurs.ts`, lien depuis `page.tsx` (≈4 fichiers).
- **Tests unitaires prévus** : 1 à 3, sur la sélection du donateur par identifiant et/ou le calcul du statut d'isolation.
- **Étapes ajoutées à la démo** : depuis la liste, cliquer un donateur, vérifier l'affichage de sa vue 360, revenir à la liste.
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté)_

---

## À venir (non détaillé, ordre de priorité du plan de livraison de l'équipe)

1. Écran 3 : séquence du cycle court (bilan d'impact à J+0, invitation unique à J+21, mention événementielle si applicable, règle d'arrêt explicite) — `screen-3` du prototype.
2. Écran 4 : confirmation du lancement du cycle, isolation du flux général, 3 indicateurs de mesure (envois/6 semaines, envois après invitation, outils consultés) — `screen-4` du prototype.
3. Sélecteur de persona complet (si un rôle autre que « Responsable collecte » devient nécessaire à l'écran).
4. Stabilisation finale pour le pitch, si le temps restant ne permet plus qu'une itération.
