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
- **Bilan** : Codage réel : 2 minutes, bien sous le budget de 10 (pas de dépassement). Les 3 critères d'acceptation sont satisfaits : `/health` et `/sante` répondent 200 sur `frontend` (8080) et `api` (8081) ; les 4 donateurs s'affichent avec nom, dernier don et badge ; la règle d'éligibilité (≥13 mois d'inactivité, aucun cycle en cours) est posée et testée. 3 tests Vitest sur `estEligibleReactivation`/`libelleStatut` (+ 2 tests déjà présents sur les routes de santé de `api/`), `npm test` passe (2 + 3). Plateforme core-platform démarrée, base `team34` créée, `podman-compose.yml` écrit, images construites et publiées sur le registre local, déploiement lancé et vérifié (`curl localhost:8080` et `localhost:8081`, 200 partout). Contrat de déployabilité : aucune borne, aucune alarme. Démo Playwright étendue d'une étape, vérifiée en headless contre le déploiement local (8080) — un ajustement a été nécessaire (`getByText` ambigu entre le titre et le KPI, corrigé en `getByRole("heading", ...)`). Commité (2 commits : le socle + l'écran, puis le correctif de démo) et poussé sur `main`. Version 1 signalée à PM Lab (`moteur_avance: false`, version tout de même enregistrée). Rien de reporté.
  ⚠️ Le développeur doit encore confirmer depuis son navigateur que `$URL_PUBLIQUE/health` et `/sante` répondent 200 (la machine ne peut pas joindre `URL_PUBLIQUE` elle-même) — ce point ne bloque pas le signal déjà envoyé, mais reste à vérifier.

## Itération 2 : La responsable collecte consulte la vue 360 d'un donateur sélectionné

**Temps restant annoncé au début de cette itération** : 50 minutes. Capacité large pour cette itération (25 min minimum nécessaires).

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
- **Bilan** : Codage réel : 2 minutes, bien sous le budget de 10 (pas de dépassement). Les 3 critères d'acceptation sont satisfaits : clic depuis la liste → vue 360 (nom, dernier don, raison) ; lien « Retour » → liste ; message d'isolation affiché pour chaque donateur. La frise d'événements et les paragraphes d'impact détaillés du prototype ont été simplifiés (✂️ prévu au plan) : remplacés par un résumé d'historique (nombre de dons, montant cumulé, premier don). 2 tests Vitest ajoutés (`trouverDonateur`, `montantCumule`), `npm test` passe (2 api + 5 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Export statique Next.js vérifié : `generateStaticParams` génère bien les 4 pages `/donateur/<id>`, servies correctement par nginx (`try_files` déjà en place). Déployé (nouvelle image frontend construite, publiée, `podman compose up -d --force-recreate`) et vérifié (200 sur `/health`, `/sante`, et sur une vue 360). Démo Playwright étendue d'une étape (clic → vue 360 → retour), un ajustement nécessaire (`getByRole heading` ambigu entre le topbar et le titre, corrigé avec `exact: true`). Commité et poussé. Version 2 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

---

## Replanification après l'itération 1

Le codage n'a pris que 2 minutes (contre 10 budgétées) : de la marge subsiste. L'itération 2 (vue 360 du donateur), déjà détaillée ci-dessus, reste le prochain objectif proposé, sans changement de priorité. Le temps restant sera redemandé au début de `/iteration 2`, comme le prévoit la section 8.

## Itération 3 : L'écran reprend fidèlement le style des maquettes (`/srv/team34/maquette/`)

**Temps restant annoncé au début de cette itération** : 45 minutes. Capacité large (25 min minimum nécessaires).

⚠️ **Insérée à la demande du développeur**, hors plan initial : demande explicite en cours de hackathon, priorisée devant la séquence du cycle (repoussée en itération 4). Les maquettes (`page1A.png`, `page1B.png`, `page2.png`) reprennent le style déjà présent dans `passation/prototype/index.html` (variables de couleur, cartes, badges), repris jusqu'ici seulement par approximation.

- **Dans le périmètre** :
  - Refonte de `frontend/src/app/page.module.css` sur les variables et classes exactes du prototype (bandeau bleu `--i4m-bleu`, cartes `--i4m-bleu-tres-clair`, alerte bordée rose `--i4m-rose-fonce`, badges pilule, avatars ronds alternant bleu/rose, police Poppins).
  - Écran 1 (liste) : bandeau héros bleu avec libellé/titre/sous-titre et badge « 4 profils à traiter », cartes donateur avec avatar, badge pilule, flèche.
  - Écran 2 (vue 360) : bandeau héros bleu avec statut, carte « Historique de don » en lignes info/valeur séparées par un filet.
- **Hors périmètre** : la séquence du cycle (écran 3, repoussée en itération 4), la confirmation (écran 4), toute animation, le filigrane papillon décoratif (🦋 en CSS `::after`, repris tel quel si le temps le permet, sinon reporté).
- **Critères d'acceptation** :
  - Étant donné l'écran 1, quand il s'affiche, alors le bandeau héros, les cartes KPI et les cartes donateur reprennent les couleurs et la forme des maquettes `page1A.png`/`page1B.png`.
  - Étant donné l'écran 2 (vue 360), quand il s'affiche, alors le bandeau héros et la carte « Historique de don » reprennent la forme de la maquette `page2.png`.
  - Étant donné les deux écrans, quand on les compare au prototype retenu, alors aucune information affichée n'a changé (seul le style change).
- **Hypothèse de l'équipe couverte** : aucune — tâche purement graphique, fidélité au prototype déjà validé par l'équipe.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/page.module.css`, `frontend/src/app/page.tsx`, `frontend/src/app/donateur/[id]/page.tsx`, `frontend/src/app/layout.tsx` (police Poppins) (4 fichiers, aucun test métier nouveau).
- **Tests unitaires prévus** : aucun (pur balisage/CSS, DoD section 8 : « pas de test sur du balisage pur ») — les tests métier existants (`donateurs.test.ts`) ne sont pas affectés et doivent continuer à passer.
- **Étapes ajoutées à la démo** : aucune de nouvelle — un ajustement a été nécessaire sur les étapes existantes (voir bilan).
- **Bilan** : Codage réel : 2 minutes + 1 minute de correctif (texte/sémantique), bien sous le budget de 10. Les 3 critères d'acceptation sont satisfaits : bandeau héros bleu + cartes KPI + cartes donateur conformes à `page1A.png`/`page1B.png` ; bandeau héros + carte « Historique de don » conformes à `page2.png` (comparaison directe par capture d'écran Playwright, voir ci-dessous) ; aucune information affichée n'a changé, seul le style. Écart imprévu : le titre du bandeau héros reprend le texte exact du prototype (« Donateurs inactifs », pas « Donateurs à réactiver ») et doit rester un titre sémantique (`<h2>`) — la démo Playwright s'appuyait sur l'ancien texte/la perte du rôle `heading`, corrigée dans la foulée. Aucun test métier nouveau (pur CSS/balisage, conforme à la DoD) ; `npm test` passe toujours (2 api + 5 frontend, inchangé). Contrat de déployabilité : aucune borne, aucune alarme. Police Poppins ajoutée via `next/font/google` (remplace Geist, plus utilisé). Déployé (nouvelle image frontend) et vérifié visuellement par capture d'écran Playwright contre les maquettes. Commité et poussé. Version 3 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

## Itération 4 : Le vrai logo d'Imagine for Margo remplace l'icône provisoire

**Temps restant annoncé au début de cette itération** : 40 minutes. Capacité large (20 min minimum nécessaires, codage estimé à 5 min).

⚠️ **Insérée à la demande du développeur**, hors plan initial, priorisée devant la séquence du cycle (repoussée en itération 5). Le fichier `/srv/team34/logo/logo.png` porte le logo officiel (papillon rose + mot-symbole « Imagine for Margo · Children without CANCER »), à la place de l'icône SVG provisoire du bandeau supérieur.

- **Dans le périmètre** : remplacer le composant `LogoI4M` (SVG inline) par le vrai logo (`frontend/public/logo.png`, via `next/image` ou `<img>`) dans le bandeau supérieur de l'écran liste et de la vue 360.
- **Hors périmètre** : favicon, toute autre apparition du logo (écrans à venir), retouche du fichier image fourni.
- **Critères d'acceptation** :
  - Étant donné l'écran liste, quand le bandeau supérieur s'affiche, alors le vrai logo apparaît à la place de l'icône provisoire.
  - Étant donné la vue 360, quand le bandeau supérieur s'affiche, alors le même logo apparaît.
  - Étant donné le logo affiché, quand on compare à `logo/logo.png`, alors il n'est ni déformé ni rogné de façon illisible.
- **Hypothèse de l'équipe couverte** : aucune — tâche graphique.
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : `frontend/public/logo.png` (copié depuis `/srv/team34/logo/logo.png`), `frontend/src/app/page.tsx`, `frontend/src/app/donateur/[id]/page.tsx`, ajustement CSS du bandeau si besoin (≈4 fichiers).
- **Tests unitaires prévus** : aucun (pur balisage/asset, DoD section 8 : « pas de test sur du balisage pur »).
- **Étapes ajoutées à la démo** : aucune.
- **Bilan** : Codage réel : 1 minute, très en dessous du budget de 5. Les 3 critères d'acceptation sont satisfaits : le vrai logo (papillon + mot-symbole) remplace l'icône SVG sur l'écran liste et la vue 360 (vérifié par capture d'écran) ; proportions respectées (`next/image`, 72×36, ratio conservé, pas de déformation ni rognage). Aucun test métier nouveau (pur asset/balisage). `npm test` inchangé (2 api + 5 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Déployé et vérifié (200 sur `/health`/`/sante`, démo Playwright toujours verte). Commité et poussé. Version 4 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

## Itération 5 : La responsable collecte prépare la séquence du cycle court

**Temps restant annoncé au début de cette itération** : 35 minutes. ✂️ Ne suffit pas pour les itérations 6 et 7 à la suite (25 min minimum chacune) : à réévaluer après celle-ci.

⚠️ **Maquettes `page3A.png`/`page3B.png` reçues** depuis la planification de cette itération : elles confirment le détail déjà prévu (étapes 1/attente/2/fin, règle d'arrêt, message 1 et message 2, lien agenda) et donnent le texte exact à reprendre.

- **Dans le périmètre** :
  - Depuis la vue 360, un lien « Préparer le cycle de réactivation » vers une nouvelle page `screen-3` du prototype : les 2 contacts (bilan d'impact à J+0, invitation unique à J+21), la mention événementielle si le donateur est habitué des événements caritatifs, la règle d'arrêt explicite.
  - Les 2 messages (aperçu), avec un texte généré à partir des données du donateur (nom, raison, source) — non éditables dans cette itération.
  - Le lien vers l'agenda des événements (texte seulement, pas d'appel réseau).
- **Hors périmètre** : l'édition des messages, la confirmation du lancement (écran 4, itération 7).
- **Critères d'acceptation** :
  - Étant donné la vue 360 d'un donateur, quand on clique « Préparer le cycle de réactivation », alors la séquence des 2 contacts s'affiche (J+0 et J+21) avec la règle d'arrêt.
  - Étant donné un donateur habitué des événements caritatifs, quand la séquence s'affiche, alors le message 2 porte la mention événementielle ; sinon elle n'apparaît pas.
  - Étant donné la séquence affichée, quand on clique « Valider et lancer le cycle », alors on est dirigé vers l'écran de confirmation (même si celui-ci est encore minimal avant l'itération 7).
- **Hypothèse de l'équipe couverte** : prépare la mesure de H3 (la séquence ne dépasse pas 2 envois) — l'indicateur réel sera affiché à l'écran 4 de confirmation.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/donateur/[id]/cycle/page.tsx`, extension de `frontend/src/lib/donateurs.ts` (champ « habitué des événements », fonction de décision et de message), lien depuis la vue 360 (≈3 fichiers).
- **Tests unitaires prévus** : 1 à 3, sur la règle d'affichage de la mention événementielle.
- **Étapes ajoutées à la démo** : depuis la vue 360, cliquer « Préparer le cycle », vérifier l'affichage des 2 contacts et de la règle d'arrêt.
- **Bilan** : Codage réel : 3 minutes, bien sous le budget de 10 (un ajustement cosmétique en plus : la raison du don ne décapitalise plus que sa première lettre, pour ne pas casser l'acronyme « ESC »). Les 3 critères d'acceptation sont satisfaits : séquence des 2 contacts + règle d'arrêt affichées depuis la vue 360 ; mention événementielle conditionnelle au champ `habitueEvenements` (vérifiée pour Claire/Marie vs Thomas/Philippe) ; le bouton « Valider et lancer le cycle » mène à une confirmation minimale (enrichie en itération 7). 2 tests Vitest ajoutés (`mentionEvenementielle`, `messageInvitation`), `npm test` passe (2 api + 7 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Vérifié visuellement par capture d'écran, conforme à `page3A.png`. Démo Playwright étendue (vue 360 → cycle → confirmation → retour liste). Commité, poussé, version 5 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

## Itération 6 : La vue 360 affiche le profil, les événements et l'impact des dons

**Temps restant annoncé au début de cette itération** : 30 minutes. Ne permet qu'une seule itération confortablement (25 min minimum chacune) : l'itération 7 attendra la prochaine mesure du temps restant.

⚠️ **Insérée à la demande du développeur**, sur la base de la maquette `page2B.png` : complète la vue 360 (écran 2), simplifiée en itération 2 par manque de temps.

- **Dans le périmètre** : sur la vue 360, après l'historique de don, ajouter : les puces « Profil & porte d'entrée » (ex. type de don, habitué des événements), la liste des événements auxquels le donateur a participé (nom, date, origine IfM/Externe), la carte « Impact de ses dons » (2-3 phrases fictives liées au montant cumulé).
- **Hors périmètre** : données réelles d'impact (textes restent génériques/fictifs par donateur), liens cliquables vers les événements.
- **Critères d'acceptation** :
  - Étant donné la vue 360 d'un donateur, quand elle s'affiche, alors les puces de profil apparaissent sous l'historique de don.
  - Étant donné la vue 360, quand elle s'affiche, alors la liste de ses événements apparaît, avec leur origine (IfM ou Externe).
  - Étant donné la vue 360, quand elle s'affiche, alors la carte « Impact de ses dons » apparaît, cohérente avec son montant cumulé.
- **Hypothèse de l'équipe couverte** : aucune directement — complète l'écran déjà couvert par H4 (vue 360 = 1 seul outil).
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : extension de `frontend/src/lib/donateurs.ts` (champs profil/événements/impact), `frontend/src/app/donateur/[id]/page.tsx`, CSS associé (≈3 fichiers).
- **Tests unitaires prévus** : 1 à 3, si une règle de calcul s'y prête (ex. formatage de la liste d'événements) ; sinon le signaler (pur balisage, pas de test).
- **Étapes ajoutées à la démo** : aucune (vue 360 déjà couverte par l'itération 2).
- **Bilan** : Codage réel : 2 minutes, bien sous le budget de 10. Les 3 critères d'acceptation sont satisfaits : puces de profil, liste d'événements (avec origine IfM/Externe) et carte « Impact de ses dons » affichées sous l'historique, pour les 4 donateurs. 1 test Vitest ajouté (`phrasesImpact` mentionne le montant cumulé), `npm test` passe (2 api + 8 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Vérifié visuellement par capture d'écran, conforme à `page2B.png`. Démo Playwright inchangée (déjà couverte). Commité, poussé, version 6 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

## Itération 7 : La confirmation du lancement affiche le récapitulatif et les indicateurs

**Temps restant annoncé au début de cette itération** : 30 minutes. Capacité suffisante (25 min minimum nécessaires).

Basée sur la maquette `page4.png` (`screen-4` du prototype).

⚠️ **Maquette `page5.png` reçue** : confirme le détail de `page4.png` et ajoute un second bouton, « Revoir le profil de <donateur> », sous « Retour à la liste ».

- **Dans le périmètre** : depuis la séquence du cycle (itération 5), le bouton « Valider et lancer le cycle » mène à un écran de confirmation : message de succès, récapitulatif (donateur, statut des 2 messages, envois max, isolation), carte « Hypothèses vérifiables » avec les 3 indicateurs (envois/6 semaines, envois après invitation, outils consultés), bouton primaire « Retour à la liste » et bouton secondaire « Revoir le profil de <donateur> » vers la vue 360.
- **Hors périmètre** : tout envoi réel, toute persistance du lancement (actualiser la page réinitialise l'état).
- **Critères d'acceptation** :
  - Étant donné la séquence validée, quand on clique « Valider et lancer le cycle », alors l'écran de confirmation s'affiche avec le nom du donateur.
  - Étant donné l'écran de confirmation, quand il s'affiche, alors les 3 indicateurs apparaissent avec leur objectif (< 9, 0, 1).
  - Étant donné l'écran de confirmation, quand on clique « Retour à la liste », alors on revient à l'écran 1.
- **Hypothèse de l'équipe couverte** : H1, H2 et H4 (les 3 indicateurs mesurés sont affichés explicitement).
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/donateur/[id]/cycle/confirmation/page.tsx` (ou équivalent), lien depuis la page cycle, CSS associé (≈3 fichiers).
- **Tests unitaires prévus** : 1 à 3, sur le calcul des indicateurs si une logique existe (sinon, pur affichage de constantes connues : 2 envois max, 0 après invitation, 1 outil).
- **Étapes ajoutées à la démo** : depuis la séquence, valider le cycle, vérifier l'affichage des indicateurs, revenir à la liste.
- **Bilan** : Codage réel : 1 minute, bien sous le budget de 10. Les 3 critères d'acceptation sont satisfaits : confirmation avec nom du donateur ; 3 indicateurs affichés avec leur objectif (< 9, 0, 1) ; bouton « Retour à la liste » fonctionnel, plus le bouton secondaire « Revoir le profil de <prénom> » (ajout de `page5.png`). 1 test Vitest ajouté (invariant `ENVOIS_MAX_CYCLE < OBJECTIF_ENVOIS_SIX_SEMAINES`), `npm test` passe (2 api + 9 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Vérifié visuellement par capture d'écran, conforme à `page4.png`/`page5.png`. Démo Playwright étendue (vérifie les indicateurs affichés). Commité, poussé, version 7 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

**Les 4 écrans du prototype retenu sont maintenant construits** (liste, vue 360, séquence du cycle, confirmation), avec la charte graphique et le logo officiel.

## Itération 8 : L'application s'adapte aux écrans tablette et desktop

**Temps restant annoncé au début de cette itération** : 25 minutes. ✂️ Correspond exactement au minimum (10 codage + 5 publication + 10 tour de test), sans marge — probablement la dernière itération de ce build.

⚠️ **Insérée à la demande du développeur**, hors plan initial : les 4 écrans sont aujourd'hui une carte mobile (max 420px) centrée sur fond pâle, quelle que soit la taille de l'écran. ⚠️ Touche les 4 écrans à la fois (dépasse la règle des « 2 écrans modifiés au plus »), mais via un seul fichier structurant partagé (`page.module.css`) : changement mécanique identique partout (points de rupture CSS), pas 4 décisions de design séparées — je le signale plutôt que de le découper artificiellement en 4 itérations creuses.

- **Dans le périmètre** : points de rupture (media queries) pour tablette (~768px) et desktop (~1280px) sur `frontend/src/app/page.module.css` : largeur du conteneur, et réorganisation en grille de ce qui s'y prête (ex. la liste des donateurs en 2 colonnes sur desktop) sans changer l'information affichée.
- **Hors périmètre** : navigation desktop spécifique (menu latéral, etc.), redesign visuel au-delà de l'adaptation des largeurs/grilles.
- **Critères d'acceptation** :
  - Étant donné un viewport mobile (~390px), quand on affiche n'importe quel écran, alors le rendu est inchangé par rapport à maintenant.
  - Étant donné un viewport desktop (≥1280px), quand on affiche la liste ou la vue 360, alors le contenu utilise une largeur plus confortable qu'une carte de 420px centrée dans le vide, sans défilement horizontal.
  - Étant donné un viewport tablette (~768px), quand on affiche n'importe lequel des 4 écrans, alors aucun élément ne se chevauche ni ne déborde.
- **Hypothèse de l'équipe couverte** : aucune — confort d'usage, pas un critère mesuré par l'équipe.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/page.module.css`, éventuellement `frontend/src/app/globals.css` (≈2 fichiers).
- **Tests unitaires prévus** : aucun (pur CSS, DoD section 8 : « pas de test sur du balisage pur »).
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours, un seul visuel).
- **Bilan** : Codage réel : 1 minute, bien sous le budget de 10. Les 3 critères d'acceptation sont satisfaits, vérifiés par capture d'écran à 390px (inchangé), 768px (carte flottante centrée, liste en 2 colonnes, rien ne déborde) et 1280px (conteneur élargi à 1040px, aucun défilement horizontal). Aucun test unitaire (pur CSS, conforme à la DoD). `npm test` inchangé (2 api + 9 frontend). Contrat de déployabilité : aucune borne, aucune alarme. Démo Playwright inchangée et toujours verte. Commité, poussé, version 8 signalée à PM Lab (`moteur_avance: false`). Rien de reporté.

## À venir (non détaillé, ordre de priorité du plan de livraison de l'équipe)

1. Sélecteur de persona complet (si un rôle autre que « Responsable collecte » devient nécessaire à l'écran).
2. Stabilisation finale pour le pitch, si le temps restant ne permet plus qu'une itération.
