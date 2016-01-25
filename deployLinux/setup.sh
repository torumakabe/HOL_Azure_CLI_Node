#!/bin/bash
apt-get -y update

# install Apache2
apt-get -y install apache2 

# write some HTML
echo \<center\>\<h1\>My Hands On Lab Page\</h1\>\<br/\>\</center\> > /var/www/html/index.html

# restart Apache
apachectl restart

# install node
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get -y install nodejs

# install Git
apt-get -y install git
