# Отукен - Этнокультурный комплекс Тувы

Vue 3 проект лендинга для этнокультурного комплекса "Отукен".

## Технологии

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- JavaScript

## Структура проекта

```
otuken-landing/
├── src/
│   ├── components/          # Vue компоненты
│   │   ├── Header.vue       # Навигация
│   │   ├── Footer.vue       # Футер
│   │   ├── HeroSection.vue  # Главная секция
│   │   ├── StatisticsSection.vue
│   │   ├── AboutSection.vue
│   │   ├── CulturalObjectsSection.vue
│   │   ├── MapSection.vue
│   │   ├── FestivalSection.vue
│   │   ├── GallerySection.vue
│   │   └── DistrictModal.vue # Модальное окно районов
│   ├── composables/         # Композиции
│   │   └── useDistricts.js  # Данные о районах
│   ├── assets/
│   │   └── styles.css       # Глобальные стили и Tailwind
│   ├── App.vue              # Главный компонент
│   └── main.js              # Точка входа
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Установка и запуск

### Локальная разработка

#### Установка зависимостей

```bash
npm install
```

#### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

#### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

#### Предпросмотр собранной версии

```bash
npm run preview
```

### Docker (рекомендуется для продакшена)

#### Сборка образа

```bash
docker build -t otuken-landing .
```

#### Запуск контейнера

```bash
docker run -d -p 8081:80 --name otuken-landing otuken-landing
```

Приложение будет доступно по адресу `http://localhost:8081`

#### Использование Docker Compose

```bash
# Сборка и запуск
docker-compose up -d --build

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

Приложение будет доступно по адресу `http://localhost:8081`

## Развертывание на продакшн-сервере

### Предварительные требования

На сервере должны быть установлены:
- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)

Проверка установки:
```bash
docker --version
docker-compose --version
```

### Шаги развертывания

#### 1. Подключение к серверу

Подключитесь к вашему серверу по SSH:
```bash
ssh user@your-server-ip
```

#### 2. Загрузка проекта на сервер

**Вариант A: Через Git (рекомендуется)**
```bash
# Создайте директорию для проекта
mkdir -p /var/www/otuken-landing
cd /var/www/otuken-landing

# Клонируйте репозиторий
git clone <your-repository-url> .

# Или если проект уже в директории
git pull origin main
```

**Вариант B: Через SCP/SFTP**
```bash
# С локальной машины
scp -r . user@your-server-ip:/var/www/otuken-landing
```

#### 3. Сборка и запуск Docker-контейнера

```bash
cd /var/www/otuken-landing

# Остановите существующий контейнер (если был запущен)
docker-compose down

# Соберите и запустите контейнер
docker-compose up -d --build
```

#### 4. Проверка работы

```bash
# Проверьте статус контейнера
docker-compose ps

# Посмотрите логи
docker-compose logs -f

# Проверьте доступность приложения
curl http://localhost:8081
```

#### 5. Настройка файрвола (если требуется)

Если используется файрвол, откройте нужный порт:
```bash
# Для UFW (Ubuntu/Debian)
sudo ufw allow 8081/tcp

# Для firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=8081/tcp
sudo firewall-cmd --reload
```

#### 6. Настройка домена и SSL (опционально)

Если нужно подключить домен и SSL, используйте Nginx как reverse proxy:

**Установка Nginx:**
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

**Создание конфигурации Nginx:**
```bash
sudo nano /etc/nginx/sites-available/otuken
```

Добавьте конфигурацию:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируйте конфигурацию:
```bash
sudo ln -s /etc/nginx/sites-available/otuken /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Установка SSL сертификата (Let's Encrypt):**
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 7. Автозапуск контейнера при перезагрузке сервера

Docker Compose с флагом `restart: unless-stopped` в `docker-compose.yml` уже настроен на автозапуск. Для дополнительной надежности можно настроить systemd:

```bash
sudo nano /etc/systemd/system/otuken-landing.service
```

Добавьте:
```ini
[Unit]
Description=Otuken Landing Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/otuken-landing
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Активируйте сервис:
```bash
sudo systemctl enable otuken-landing.service
```

### Обновление приложения

При обновлении кода:

```bash
cd /var/www/otuken-landing

# Обновите код (если через Git)
git pull origin main

# Пересоберите и перезапустите контейнер
docker-compose up -d --build

# Проверьте логи
docker-compose logs -f
```

### Полезные команды

```bash
# Остановка контейнера
docker-compose down

# Перезапуск контейнера
docker-compose restart

# Просмотр логов
docker-compose logs -f

# Просмотр использования ресурсов
docker stats otuken-landing

# Вход в контейнер (для отладки)
docker exec -it otuken-landing sh
```

### Резервное копирование

Рекомендуется настроить резервное копирование исходного кода и, при необходимости, настроек:

```bash
# Пример скрипта резервного копирования
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/otuken-landing
```

## Особенности архитектуры

- **Компонентный подход**: Каждая секция сайта выделена в отдельный компонент
- **Разделение логики**: Данные о районах вынесены в composable
- **Реактивность**: Использование Vue 3 Composition API для управления состоянием
- **Стилизация**: Tailwind CSS через npm (не CDN), что позволяет использовать полный функционал

## Компоненты

- `Header` - Навигационное меню с плавной прокруткой
- `Footer` - Футер с контактами и ссылками
- `HeroSection` - Главный баннер с призывом к действию
- `StatisticsSection` - Статистика комплекса
- `AboutSection` - Описание проекта
- `CulturalObjectsSection` - Объекты комплекса (карточки)
- `MapSection` - Интерактивная карта районов
- `FestivalSection` - Информация о фестивале
- `GallerySection` - Галерея изображений
- `DistrictModal` - Модальное окно с информацией о районе
