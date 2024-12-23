# satframe

## System config

Clone this and [inky](https://github.com/pimoroni/inky) into the home folder.

Run `./setup.sh` to install deps.

Add to `/etc/crontab`:

```
# Reboot the system daily at 3 AM
0 3 * * * root /sbin/reboot

# Run satframe as user `joerick` every 30 minutes
*/30 * * * * joerick /home/joerick/satframe/run.sh

# refresh the screen on boot as well
@reboot sudo -u joerick /home/joerick/satframe/run.sh
```
