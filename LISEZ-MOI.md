# Carnet de tir — de la page web à l'APK

Trois chemins, du plus rapide au plus complet. Le contenu de l'app est identique dans les trois cas :
un seul fichier `www/index.html`, sans dépendance, qui fonctionne hors ligne.

---

## 1. Tout de suite, sans rien compiler

1. Copie `www/index.html` sur le téléphone (câble USB, mail à toi-même, cloud…).
2. Ouvre-le avec Chrome.
3. Menu ⋮ → **Ajouter à l'écran d'accueil**.

Tu obtiens une icône, un lancement plein écran sans barre d'adresse, et un fonctionnement
100 % hors ligne. Les données sont dans le stockage local du navigateur.

Attention : si tu effaces les données de navigation de Chrome, le carnet part avec.
Fais un export JSON de temps en temps (menu **Données**).

---

## 2. Un vrai APK sans installer quoi que ce soit — GitHub Actions

Le plus simple si tu n'as pas d'environnement de développement.

1. Crée un dépôt GitHub (privé si tu veux).
2. Envoie-y le contenu de ce dossier :

```bash
git init
git add .
git commit -m "Carnet de tir"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/carnet-de-tir.git
git push -u origin main
```

3. Onglet **Actions** du dépôt → le workflow « Build APK » démarre seul.
4. Au bout de ~5 minutes, télécharge l'artefact **carnet-de-tir-apk**.
5. Décompresse, transfère `app-debug.apk` sur le téléphone, ouvre-le.
   Android demandera d'autoriser l'installation depuis cette source : accepte.

À chaque `git push`, un nouvel APK est produit automatiquement.

---

## 3. Compilation locale

Prérequis : Node.js 18+, JDK 17, Android Studio (ou seulement le SDK Android + `ANDROID_HOME` défini).

```bash
npm install
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

L'APK sort dans `android/app/build/outputs/apk/debug/app-debug.apk`.

Pour ouvrir le projet dans Android Studio (icône, nom, version, signature) :

```bash
npx cap open android
```

---

## APK signé pour une installation durable

L'APK de debug s'installe très bien mais n'est pas signé avec ta clé. Pour un APK de release :

```bash
keytool -genkey -v -keystore carnet.keystore -alias carnet -keyalg RSA -keysize 2048 -validity 10000
cd android && ./gradlew assembleRelease
```

puis référence le keystore dans `android/app/build.gradle`. Dis-le moi si tu veux que je
te prépare le bloc `signingConfigs` et la version du workflow qui signe automatiquement.

---

## Structure

```
www/index.html      l'application entière (40 Ko, zéro dépendance)
www/manifest.json   métadonnées d'installation PWA
www/sw.js           cache hors ligne
www/icon.svg        icône
capacitor.config.json
package.json
.github/workflows/build-apk.yml
```

Pour modifier l'app, il n'y a qu'un fichier à toucher : `www/index.html`.
Les catalogues (poudres, amorces, étuis, calibres, projectiles, armes) sont en haut du `<script>`,
dans des tableaux JavaScript lisibles.
