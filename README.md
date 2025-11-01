# satframe

## Image

Raspbian Lite, 32bit, bookworm.

## System config

Clone this and [inky](https://github.com/pimoroni/inky) into the home folder.

Run `./setup.sh` to install deps.

Add to `/etc/crontab`:

```
# Reboot the system daily at 3 AM
0  3    * * *   root    /sbin/reboot

# Run satframe as user `joerick` every 30 minutes
*/30 *  * * *   joerick /home/joerick/satframe/run.sh 2>&1 | logger -t satframe

# refresh the screen on boot as well
@reboot         joerick /home/joerick/satframe/run.sh | logger -t satframe
```

If using tailscale, quiten logging, `sudo systemctl edit tailscaled`

```
[Service]
LogLevelMax=notice
```

Set a max log size,  `sudo nano /etc/systemd/journald.conf`

```
SystemMaxUse=500M
```
