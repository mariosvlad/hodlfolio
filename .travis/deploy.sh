openssl aes-256-cbc -K $encrypted_a483cd4a3c1c_key -iv $encrypted_a483cd4a3c1c_iv -in .travis/travis.key.enc -out .travis/travis.key -d
eval "$(ssh-agent -s)"
chmod 600 .travis/travis.key
ssh-add .travis/travis.key
ssh-keyscan dokku.hodlfolio.app >> ~/.ssh/known_hosts
cp app.json dist/
cp package.json dist/
cp package-lock.json dist/
cd dist && git init
git add . && git commit -m "Deploy to dokku"
git remote add deploy dokku@dokku.hodlfolio.app:hodlfolio
git push deploy master --force
