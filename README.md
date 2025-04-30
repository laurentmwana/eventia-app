
# 🎉 Eventia

## 🧾 Introduction du projet

Ce projet a été réalisé dans le cadre d’un **Travail Pratique de Génie Logiciel**.
Il s'agit d'une application web permettant de **gérer l'envoi d'invitations à des invités** dans un contexte d’événement (comme une cérémonie, une réunion ou une fête).

L'application permet de :
- Créer une liste d’invités,
- Leur attribuer automatiquement une place,
- Suivre les personnes invitées,
- Et éventuellement leur envoyer une notification ou un email.


---

Ce projet a été réalisé dans le cadre d’un **Travail Pratique (TP) de Génie Logiciel**.
Il s’agit d’une application web permettant de **gérer l’envoi d’invitations**, en utilisant **Laravel** côté serveur et **Inertia.js + React** pour l’interface utilisateur.

---

## 🚀 Technologies utilisées

- **Laravel 11** – Backend PHP
- **Inertia.js** – Pont entre Laravel et React
- **React.js** – Interface utilisateur moderne
- **Vite** – Compilation et développement JS
- **Tailwind CSS** – Mise en page rapide
- **SQLite / MySQL** – Base de données
- **PHP 8.2+**

---

## 📚 Objectifs pédagogiques

- Modéliser des entités (invité, invitation, événement)
- Appliquer le modèle MVC avec Laravel
- Intégrer un framework frontend (React)
- Utiliser Inertia.js pour des interfaces modernes
- Gérer des routes, contrôleurs et composants
- (Optionnel) Envoyer des emails ou notifications

---

## ✨ Fonctionnalités

- ✅ Création et gestion des invités
- ✅ Envoi d’invitations à chaque invité
- ✅ Attribution d’une place automatiquement
- ✅ Liste des invités et de leurs statuts
- ✅ Interface responsive
- ✅ (Optionnel) Envoi de mails ou notifications

---

## 📦 Installation du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/invitation-project.git
cd invitation-project
```

### 2. Installer les dépendances PHP

```bash
composer install
```

### 3. Installer les dépendances Node.js

```bash
npm install
```

### 4. Configurer l’environnement

```bash
cp .env.example .env
php artisan key:generate
```

Configurer la base de données dans `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=invitation_db
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Migrer la base de données

```bash
php artisan migrate
```

> 💡 Vous pouvez aussi utiliser SQLite pour un test rapide.

### 6. Lancer les serveurs

```bash
php artisan serve
npm run dev
```

Accédez ensuite à : [http://localhost:8000](http://localhost:8000)

---

## 📁 Structure du projet

- `app/Models/` – Modèles Laravel (`Invite`, `Invitation`, etc.)
- `app/Http/Controllers/` – Logique de l’application
- `resources/js/Pages/` – Pages React (Inertia)
- `routes/web.php` – Routes Laravel
- `database/migrations/` – Structure des tables


---

## 📌 Notes

- Ce projet est à but pédagogique.
- Des améliorations sont possibles : QR codes, mails automatiques, gestion des confirmations, etc.

---

## 📄 Licence

Ce projet est libre pour un usage éducatif uniquement.

