# Task Management

## Setup Process
### After cloning the repository, please follow the steps below:

 1. Go to the project directory
<br><br>
 2. Run `composer install && npm install`
    <br><br>
 3. Setup you database and create `.env` copying the content from `.env.example`
    <br><br>
 4. Run `php artisan key:generate`
    <br><br>
 5. From the `.env` file please specify the correct database credentials
    <br><br>
 6. And make sure to specify the following:
 - `APP_URL=http://your-local-domain.test`
 - `FRONTEND_URL=http://localhost:5173`
 - `SANCTUM_STATEFUL_DOMAINS=localhost:5173`
   <br><br>
 7. After everything has been setup, run `php artisan migrate:fresh --seed`
    <br><br>
 8. Edit file `resources/js/api/axios.js` and specify correct `baseURL` on line 4 (`there could be a better way to do this but for the mean time`)
    <br><br>
 9. Run `npm run dev`
<br><br>
10. You should be able to login in the system `http://your-local-domain.test/login`
 - `Email: admin@example.com`
 - `Password: password`
   <br><br>
Go to the dashboard (`http://your-local-domain/dashboard`)
  where in you can nagivate to <b>Manage Tasks</b> (`http://your-local-domain/tasks`) and <b>Manage Users</b> (`http://your-local-domain/users`)
