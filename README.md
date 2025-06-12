# Setup Process
> After cloning the repository, please follow the steps below.

## 1. Go to the project directory and run:
> `composer install && npm install`
## 2. Setup your `.env`
> `cp .env.example .env`
## 3. Configure `.env` credentials and values
> Open your `.env` and set the following values (update as needed)
```apacheconf
DB_DATABASE=dbname
DB_USERNAME=dbuser
DB_PASSWORD=dbpass
```
```apacheconf
APP_URL=http://you-local-domain-name
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```
## 4. Generate `APP_KEY` if needed (optional)
> `php artisan key:generate`

## 5. After everything is setup from your `.env`
> `php artisan migrate:fresh --seed`

## 6. Edit and specify `baseURL` from `resources/js/api/axios.js` on `line 4`
```apacheconf
baseURL: 'http://change-this-to-your-domain-name/api'
```
> There could be a better approach to this, but we do this in the meantime

## 7. Run the development server
> `npm run dev`

## 8. Once dev server is running without errors, our app should be ready
> Login URL: `http://your-local-domain/login`
```apacheconf
Email: admin@example.com
Password: password
```
> Dashboard: `http://your-local-domain/dashboard`
> Manage Tasks: `http://your-local-domain/tasks`
> Manage Users: `http://your-local-domain/users`
