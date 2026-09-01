# Rapports — Sondages & rapports d'activité, en mieux

Une application de collecte de sondages et de rapports d'activité, inspirée de Google Forms mais pensée comme un vrai produit SaaS premium : parcours immersif "une question à la fois" côté répondant, tableau de bord complet côté administration, et un thème (couleurs, typographie) entièrement centralisé et modifiable depuis un seul fichier.

---

## Sommaire

1. [Aperçu du produit](#aperçu-du-produit)
2. [Les deux espaces](#les-deux-espaces)
3. [Stack technique](#stack-technique)
4. [Démarrage rapide](#démarrage-rapide)
5. [Arborescence du projet](#arborescence-du-projet)
6. [Le système de couleurs (tout est modifiable)](#le-système-de-couleurs-tout-est-modifiable)
7. [Le système de typographie](#le-système-de-typographie)
8. [Le moteur de sondage](#le-moteur-de-sondage)
9. [Types de questions disponibles](#types-de-questions-disponibles)
10. [Ajouter une question conditionnelle](#ajouter-une-question-conditionnelle)
11. [Créer un nouveau sondage](#créer-un-nouveau-sondage)
12. [Contexts globaux](#contexts-globaux)
13. [Services & données (statique aujourd'hui, backend demain)](#services--données-statique-aujourdhui-backend-demain)
14. [Le tableau de bord admin](#le-tableau-de-bord-admin)
15. [Accessibilité & responsive](#accessibilité--responsive)
16. [Scripts disponibles](#scripts-disponibles)
17. [Feuille de route](#feuille-de-route)
18. [Licence](#licence)

---

## Aperçu du produit

L'utilisateur répond à un rapport d'activité (ou tout autre sondage défini dans `data/`) à travers un parcours fluide : une seule question visible à la fois, une barre de progression claire (`Question 3 / 12`), une navigation Précédent/Suivant, une validation avant de continuer, et un écran de vérification permettant de modifier n'importe quelle réponse avant l'envoi final.

Côté administration, chaque rapport soumis ou en brouillon est consultable, filtrable et analysable : KPI (rapports soumis, brouillons, taux de complétion), graphiques (répartition par département, statuts), vue cartes ou tableau, et une fiche détail par rapport.

Rien n'est câblé en dur : les couleurs, la typographie, le schéma des questions et les données sont tous **centralisés et remplaçables** sans toucher aux composants.

---

## Les deux espaces

L'application est structurée en **deux interfaces distinctes**, avec chacune son propre layout et sa propre navigation :

| Espace | Route | Public | Rôle |
|---|---|---|---|
| **Grand public** | `/repondre/[surveyId]` | Sans authentification | Répondre à un sondage, question par question, jusqu'à l'écran de confirmation. |
| **Admin** | `/admin/*` | Réservé à l'équipe | Vue d'ensemble (KPI + graphiques), liste des rapports, fiche détail, gestion du thème (couleurs). |

Chaque espace a sa coquille (*shell*) dédiée dans `components/espace/` :

- `EspacePublicShell.tsx` — mise en page minimale, centrée, sans distraction, pensée pour la concentration sur une question.
- `EspaceAdminShell.tsx` — mise en page avec navigation latérale (Vue d'ensemble, Rapports, Couleurs & thème), pensée pour la densité d'information.

---

## Stack technique

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — couleurs et polices branchées sur des variables CSS générées depuis `styles/colors.tsx`
- **shadcn/ui** comme base pour les primitives (`components/ui/`), adaptées au design system du projet
- **Lucide Icons**
- **Framer Motion** pour les micro-animations (transitions entre questions, apparitions de toasts)
- **Recharts** pour les graphiques du dashboard
- Architecture 100 % componentisée, mobile-first, sans dépendance obligatoire à un backend pour tourner en démo




- `/` — page d'accueil (choix : répondre à un sondage ou ouvrir le tableau de bord)
- `/repondre/rapport-hebdo` — parcours de réponse au sondage par défaut
- `/admin` — tableau de bord

Aucune base de données n'est requise pour démarrer : les données sont mockées dans `data/` et servies via `services/` (voir plus bas).


## Arborescence du projet

```
context/
  toastContext.tsx        Notifications toast globales (succès / erreur / info)
  languageContext.tsx      Langue active (FR/EN) + fonction de traduction t()

styles/
  typography.ts            Échelle typographique (display / body / label)
  colors.tsx                Source UNIQUE de toutes les couleurs de l'app

lib/
  utils.ts                  cn(), formatDate(), formatDateTime(), generateId()
  validation.ts              Validation des réponses par type de question
  constants.ts                Routes, nom de l'app, durée des toasts...

hooks/
  useToast.ts                Accès au contexte toast
  useLanguage.ts              Accès au contexte langue
  useReports.ts               Chargement/rafraîchissement de la liste des rapports (admin)
  useSurveyRunner.ts           Cœur du parcours "une question à la fois" : visibilité
                                conditionnelle, validation, navigation, progression

services/
  surveyService.ts            Accès au(x) schéma(s) de sondage
  reportsService.ts            CRUD des rapports (mock en mémoire aujourd'hui,
                                 remplaçable par de vrais appels API demain)

components/
  ui/                         Primitives : Button, Card, Badge, Input, Textarea,
                               Select, Modal, ProgressBar, IconButton...
  form/                       Composants du moteur de sondage : QuestionField,
                               RadioCardGroup, CheckboxGroup, PillSelect,
                               RatingScale, StepHeader, ReviewList, SurveyRunner
  cards/                      KpiCard, ReportCard, ColorSwatchCard
  sections/                   Hero, DashboardOverview, FilterToolbar, EmptyState,
                               Sidebar (nav admin), Topbar
  espace/                     EspacePublicShell, EspaceAdminShell
                               (les deux coquilles d'interface)

types/
  survey.ts                   Question, Section, QuestionType, ConditionalRule...
  report.ts                   Report, ReportStatus, ReportFilters
  theme.ts                    ColorToken

data/
  surveySchema.ts              Schéma du sondage "Rapport d'activité hebdomadaire"
  mockReports.ts                Rapports de démonstration (soumis + brouillons)

app/
  layout.tsx                   Layout racine : polices, providers, injection du thème
  globals.css                   Tailwind + styles de base
  page.tsx                      Accueil (choix des deux espaces)
  (public)/
    repondre/[surveyId]/page.tsx   Parcours de réponse au sondage
  admin/
    layout.tsx                  EspaceAdminShell (navigation latérale)
    page.tsx                     Vue d'ensemble (KPI + graphiques)
    rapports/page.tsx             Liste des rapports (recherche, filtres, cartes/tableau)
    rapports/[id]/page.tsx         Fiche détail d'un rapport
    parametres/couleurs/page.tsx   Palette de couleurs de l'app (aperçu + tokens)
```

---

## Le système de couleurs (tout est modifiable)

**Toutes** les couleurs de l'application — les deux espaces confondus — sont définies à un seul endroit : [`styles/colors.tsx`](./styles/colors.tsx).

```ts
export const colors = {
  canvas: "#F5F6F3",
  surface: "#FFFFFF",
  ink: "#14171F",
  accent: "#0B6E63",
  amber: "#E1A339",
  danger: "#B4432D",
  chart1: "#0B6E63",
  // ...
} as const;
```

Aucun composant ne contient de couleur "en dur" (`bg-[#...]`). À la place :

1. `styles/colors.tsx` exporte `generateThemeCSS()`, qui transforme l'objet `colors` en bloc `:root { --color-xxx: ...; }`.
2. `app/layout.tsx` injecte ce bloc une seule fois, au chargement de l'app.
3. `tailwind.config.ts` relie chaque couleur Tailwind (`bg-accent`, `text-ink`, `border-border`...) à sa variable CSS correspondante.
4. Les composants utilisent donc des classes Tailwind normales (`bg-accent`, `text-ink-muted`) qui pointent en réalité vers `styles/colors.tsx`.

**Pour changer l'identité visuelle complète de l'app (admin + grand public), il suffit de modifier les valeurs hex dans `styles/colors.tsx` et de redéployer.** C'est la configuration *statique* actuelle.

La page `/admin/parametres/couleurs` affiche déjà chaque token de couleur (nom, usage, valeur hex) sous forme de palette visuelle, groupée par catégorie (fonds, texte, accents, statuts, graphiques) — elle sert aujourd'hui de documentation vivante du thème, et est structurée (via `types/theme.ts` et `ColorToken[]`) pour devenir un vrai éditeur de thème dynamique plus tard, sans changement d'architecture.

---

## Le système de typographie

Deux familles, définies dans [`styles/typography.ts`](./styles/typography.ts) :

- **Fraunces** (`font-display`) — pour les titres, la question active du sondage, les moments "hero". Une serif à forte personnalité, pas une police d'interface neutre.
- **Inter** (`font-sans`) — pour toute l'interface : formulaires, tableaux, boutons, données.

Une échelle de tailles est exportée (`typography.display.xl/lg/md/sm`, `typography.body.lg/md/sm/xs`) pour garder une hiérarchie cohérente partout, plutôt que des tailles arbitraires dispersées dans les composants.

---

## Le moteur de sondage

Le cœur du parcours "une question à la fois" vit dans [`hooks/useSurveyRunner.ts`](./hooks/useSurveyRunner.ts), complètement découplé de l'UI :

- **Aplatissement** des sections en une liste unique de questions.
- **Visibilité dynamique** : à chaque réponse, la liste des questions *visibles* est recalculée (une question conditionnelle apparaît/disparaît immédiatement).
- **Validation** par type de question avant de pouvoir avancer (`lib/validation.ts`).
- **Navigation** avant/arrière, avec retour à l'écran précédent en incluant l'écran de vérification.
- **`jumpToQuestion(id)`** pour permettre de modifier une réponse précise depuis l'écran de récapitulatif.
- **Progression** (`progressPercent`) pour la barre de progression.

`components/form/SurveyRunner.tsx` consomme ce hook et se contente d'afficher l'état : question active → écran de vérification → confirmation.

---

## Types de questions disponibles

Définis dans `types/survey.ts` (`QuestionType`) et rendus par `components/form/QuestionField.tsx` :

| Type | Composant | Description |
|---|---|---|
| `short_text` | `Input` | Champ texte court, une ligne |
| `textarea` | `Textarea` | Texte long, plusieurs lignes |
| `number` | `Input[type=number]` | Nombre, avec min/max/suffixe optionnels |
| `date` | `Input[type=date]` | Sélecteur de date natif |
| `select` | `PillSelect` | Choix unique parmi une courte liste, en pastilles |
| `radio` | `RadioCardGroup` | Cartes cliquables larges, état sélectionné très visible, coche animée |
| `checkbox` | `CheckboxGroup` | Choix multiple |
| `rating` | `RatingScale` | Échelle numérique (ex. 1 à 5) avec libellés aux extrémités |

Les cartes `radio` sont le composant le plus soigné du système : grande zone cliquable, bordure et fond distincts à la sélection, coche animée, focus clavier visible — pensées pour remplacer les boutons radio HTML par défaut, jugés trop discrets pour une expérience premium.

---

## Ajouter une question conditionnelle

Une question peut ne s'afficher (et n'être validée) que si une réponse précédente correspond à une valeur donnée :

```ts
{
  id: "blockerDetails",
  type: "textarea",
  label: "Décrivez le blocage rencontré",
  required: true,
  condition: { questionId: "goalStatus", equals: "blocked" },
}
```

`useSurveyRunner` filtre automatiquement les questions visibles à chaque changement de réponse — aucune logique supplémentaire n'est nécessaire ailleurs.

---

## Créer un nouveau sondage

1. Dupliquer la structure de `weeklyActivitySurvey` dans `data/surveySchema.ts` (ou créer un nouveau fichier dans `data/`) avec un nouvel `id`.
2. L'ajouter au tableau `surveys`.
3. Le sondage est immédiatement disponible sur `/repondre/{id}`, via `services/surveyService.ts` → `getSurveySchema(id)`.

Aucune modification de composant n'est nécessaire : le moteur de sondage est générique.

---

## Contexts globaux

- **`ToastContext`** (`context/toastContext.tsx`) — file d'attente de notifications (`success`, `error`, `info`), affichées en bas à droite, avec disparition automatique. Utilisé notamment après la soumission d'un rapport ou une action admin (changement de statut, suppression...).
- **`LanguageContext`** (`context/languageContext.tsx`) — langue active (`fr` par défaut, `en` disponible) et fonction `t(clé)`. Le dictionnaire est volontairement minimal en démo ; en production, il serait éclaté par langue (`locales/fr.json`, `locales/en.json`) sans changer l'API du hook `useLanguage()`.

Les deux providers sont montés une seule fois dans `app/layout.tsx`, donc disponibles dans les deux espaces (admin et grand public).

---

## Services & données (statique aujourd'hui, backend demain)

`services/reportsService.ts` et `services/surveyService.ts` exposent des fonctions **asynchrones** (`listReports()`, `createReport()`, `getSurveySchema()`...) qui, pour l'instant, lisent/écrivent en mémoire à partir des données mockées de `data/`.

C'est un choix délibéré : les hooks et composants consomment déjà une API "comme si" elle appelait un vrai backend. Le jour où une base de données existe, seuls les fichiers de `services/` changent (remplacer le corps des fonctions par des appels `fetch`/ORM) — aucun composant, hook ou page ne doit être modifié.


Le tableau de bord createur pour tous ceu qu'il veulent créer et publier leur formulaire out ype de sondage 

- **KPI** : rapports soumis, brouillons, taux de complétion moyen, départements actifs.
- **Graphiques** (Recharts) : répartition des rapports par département (barres), répartition par statut (donut).
- **Recherche & filtres** : par nom, statut (soumis/brouillon), département.
- **Deux vues** : cartes (aperçu visuel rapide) ou tableau (lecture dense).
- **Fiche détail** : toutes les réponses d'un rapport, question par question, avec son statut.

---

---

## Le tableau de bord admin

- **KPI** : rapports soumis, brouillons, taux de complétion moyen, départements actifs.
- **Graphiques** (Recharts) : répartition des rapports par département (barres), répartition par statut (donut).
- **Recherche & filtres** : par nom, statut (soumis/brouillon), département.
- **Deux vues** : cartes (aperçu visuel rapide) ou tableau (lecture dense).
- **Fiche détail** : toutes les réponses d'un rapport, question par question, avec son statut.

---

## Accessibilité & responsive

- Mobile-first : le parcours de réponse et le dashboard sont pensés d'abord pour un écran étroit.
- Focus clavier visible sur tous les éléments interactifs (`focus-visible:ring-2`).
- Contrastes texte/fond conformes sur l'ensemble de la palette par défaut.
- Zones cliquables larges sur les cartes de réponse (radio/checkbox), adaptées au tactile.

---

## Scripts disponibles

```bash
npm run dev       # serveur de développement
npm run build      # build de production
npm run start        # lancer le build de production
npm run lint           # linter
```

---

## Feuille de route

- [ ] Éditeur de thème dynamique dans `/admin/parametres/couleurs` (persistance des couleurs choisies)
- [ ] Authentification de l'espace admin
- [ ] Branchement d'un vrai backend (remplacement de `services/`)
- [ ] Export CSV/PDF des rapports depuis le dashboard
- [ ] Sections de sondage réordonnables et retirables depuis l'admin
- [ ] Traduction complète de l'interface (EN) via `LanguageContext`
#   s t o m a - k n o w  
 