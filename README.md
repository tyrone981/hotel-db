# Hôtel Le Wouri Prestige & Suites — Douala / Yaoundé, Cameroun

> Interface de réception et de gestion hôtelière conçue sur mesure en **HTML5, CSS3 et JavaScript pur**. Zéro dépendance externe, tarification intégrale en **FCFA**, gestion des paiements locaux (**Orange Money**, **MTN Mobile Money**, Espèces, Carte) et respect rigoureux du schéma relationnel (`docs/erd.png`).

---

## 🇨🇲 Contexte & Hospitalité Camerounaise

Ce projet quitte les archétypes génériques d'IA pour s'ancrer dans la réalité chaleureuse et professionnelle de l'hôtellerie camerounaise :
- **Établissement** : Hôtel Le Wouri Prestige & Résidences (Bonanjo, Douala & Bastos, Yaoundé).
- **Devise** : **Franc CFA (FCFA)** avec séparateur de milliers et TVA camerounaise officielle à **19,25%**.
- **Moyens de Règlement** : **Orange Money** (`#150*...`), **MTN MoMo** (`*126#`), **Espèces**, **Cartes Bancaires** (Afriland First Bank, UBA, Société Générale, BICEC).
- **Personnel** : Yvan Leonis (Chef de Réception).
- **Gastronomie & Services Locaux** : Dîner Dégustation Ndolè Royal & Gambas de Kribi, Navette climatisée Aéroport International de Douala/Nsimalen, Soins corporels aux baumes de karité et coco, Petit-déjeuner buffet aux beignets-haricots-bouillie et fruits de Penja.

---

## 🗄️ Alignement avec le Schéma Relationnel (`docs/erd.png`)

Chaque table et relation du diagramme est représentée fidèlement :

| Table Relationnelle (`erd.png`) | Équivalent & Fonctionnalité dans l'Application |
| :--- | :--- |
| `client` | **Fichier Clients & VIP** : Noms, coordonnées camerounaises (+237), statut VIP (Platine, Or, Standard), préférences de séjour. |
| `room_type` | **Catégories de Chambres** : Confort Côté Jardin, Suite Junior Exécutive, Suite Prestige Wouri, Suite Familiale Baobab. |
| `room_status` | **Gouvernance & État d'Entretien** : `Disponible`, `Occupée`, `Nettoyage`, `Maintenance`. |
| `room` | **Plan des Chambres** : Réparties sur 3 niveaux avec capacité d'accueil et tarif de base en **FCFA**. |
| `amenity` & `room_amenity` | **Conforts & Équipements** : Fibre optique, climatisation inverter, groupe électrogène 24h/24, eau filtrée, Smart TV Canal+. |
| `reservation` | **Dossiers de Séjour** : Dates d'arrivée et de départ, statut (`confirmée`, `en séjour`, `clôturé`, `annulée`), fiches d'accueil. |
| `reservation_room` | **Affectation des Chambres** : Association chambre-séjour avec tarif par nuitée bloqué. |
| `service` | **Prestations & Restauration** : Ndolè Royal, navette aéroport VIP, soins karité, buffet camerounais, salle de conférence. |
| `service_opening_hours` | **Horaires d'Ouverture** : Créneaux de service et capacités d'accueil. |
| `service_booking` | **Commandes de Services** : Rattachées aux résidents avec date, heure et nombre de convives. |
| `invoice` | **Folios & Notes d'Hôtel** : Générées automatiquement avec NIF, RCCM et ventilation TVA 19.25%. |
| `invoice_line` | **Lignes de Facturation** : Détail nuitées, prestations consommées, quantités et total HT. |
| `payment` | **Encaissements** : Suivi des règlements par **Orange Money**, **MTN MoMo**, **Espèces** ou **Carte**, avec solde restant. |
| `review` | **Livre d'Or** : Notes sur 5 étoiles, témoignages réels et sincères des résidents. |

---

## 🚀 Lancement & Utilisation Immédiate

Aucune compilation ni installation de paquet n'est requise :

1. **Ouverture directe** : Double-cliquez sur [`index.html`](file:///c:/Users/yvanl/hotel-db/index.html) dans votre explorateur de fichiers.
2. **Ou via serveur local (optionnel)** :
   ```bash
   python -m http.server 3000
   # ou
   npx serve .
   ```
   Rendez-vous ensuite sur `http://localhost:3000`.

---

## 📂 Organisation des Fichiers

```text
hotel-db/
├── index.html           # Structure HTML5 sémantique et modales en français
├── styles.css           # Palette chaleureuse camerounaise, styles d'impression
├── style.css            # Copie miroir de styles.css pour compatibilité
├── app.js               # Logique métier, données de démo FCFA et persistance localStorage
├── README.md            # Documentation et correspondance avec la base de données
└── docs/
    └── erd.png          # Diagramme Entité-Association original
```
