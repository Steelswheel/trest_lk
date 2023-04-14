ssh bitrix@crm.kooperatiff.ru "
cd /home/bitrix/www/lk;
git pull;
cd frontend;
npm i;
npm run build;
"
