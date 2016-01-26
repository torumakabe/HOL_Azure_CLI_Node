# Azure x-plat CLI and Node.js SDK Hands On Lab

## Objectives
* Learn CLI & SDK for automation and efficient operation
* Understand how to use a large blob file from your apps
* Enjoy hacking on Azure!

## Prerequisites

* Azure Subscription
    * If you don't have it, please see [the page](https://azure.microsoft.com/en-us/pricing/free-trial/) to get free one-month trial credits.
    
* Client
    * Mac OS X or Windows
    * Terminal (on Windows, use Powershell prompt)
    * SSH Client (on Wndows, use Putty, Teraterm, etc)
    * Git (on Windows, use Github for Windows, etc)
    * Tested on
        * Windows 10 (1511)
        * Mac OS X (El Capitan)
    
## Install Azure x-plat  CLI on your client
The following installer packages are available:

* [Windows Installer](http://go.microsoft.com/?linkid=9828653&clcid=0x409)
* [Mac OS X Installer](http://go.microsoft.com/fwlink/?linkid=252249&clcid=0x409)

Once the Azure CLI has been installed, you will be able to run the azure command from your command-line user interface (Bash, Terminal, Command prompt, and so on). For example, to run the help command, type the following:

    azure help
    
References:
*  [Install the Azure CLI](https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/)

## Connect to Azure
Interactively logging in is easy: type azure login and follow the prompts as shown below:

    azure login                                                                                    
    info:    Executing command login
    info:    To sign in, use a web browser to open the page http://aka.ms/devicelogin. Enter the code XXXXXXXXX to authenticate. If you're signing in as an Azure AD application, use the --username and --password parameters.
    
Copy the code offered to you, above, and open a browser to http://aka.ms/devicelogin. Enter the code, and then you are prompted to enter the username and password for the identity you want to use.

Your account may have more than one subscription. You can list your subscriptions by typing:

    azure account list

You can set the current Azure subscription by typing the following. Use the subscription name or the ID that has the resources you want to manage.

    azure account set **subscription name or ID**

By default, the Azure CLI starts in the service management mode (asm mode). Type the following to switch to resource group mode.

    azure config mode arm

References:
* [Connect to an Azure subscription from the Azure Command-Line Interface (Azure CLI)](https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-connect/#use-the-log-in-method)

## Deploy VM
Download repo onto your client by Git. If you don't have Git, download it as zip from [here](https://github.com/ToruMakabe/HOL_Azure_CLI_Node/archive/master.zip).
    
    git clone https://github.com/ToruMakabe/HOL_Azure_CLI_Node.git 
    
    cd HOL_Azure_CLI_Nod/deployLinux
   
Create a Resource Group for this lab
   
    azure group create HOL3 -l "Japan East"
    
Edit parameter file "azuredeploy.parameters.json" to specify your unique parameters. (newStragaAccountname, location, adminUsername, adminPassword, dnsNameForPublicIP)

After that, run the following command to create VM.    
 
    azure group deployment create HOL3 dep01 -f ./azuredeploy.json -e ./azuredeploy.parameters.json
    
In this deployment, you can not only create VM, storage and network, but also install and configure packages such as apache, node, git. Please see azuredeploy.json and setup.sh in the directory.

To make sure the results of this configuration, log into the VM. If you are on Windows, use other telnet client e.g. putty, teraterm.

    ssh **adminUserName**@**yourdnsNameForPublicIP**.japaneast.cloudapp.azure.com
    
After logging in, check the status of apache by curl. You can do it on web browser also.
 
    curl **yourdnsNameForPublicIP**.japaneast.cloudapp.azure.com

Congrats.

References:
* [Deploy and manage virtual machines by using Azure Resource Manager templates and the Azure CLI](https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-deploy-rmtemplates-azure-cli/)

## Create a Storage Account and Blob Container for large files used in apps

Make storage account to store files for application. Change storage account name the following  from yournamehol3 to **yourname**hol3 as unique identifier.

**Run the following commands on your client, not on VM in Azure**

    azure storage account create **yournamehol3** -g HOL3 -l "Japan East" --type LRS

Get your storage account key. Keep character string after "AccountKey=" in the output.

    azure storage account connectionstring show **yournamehol3**
    
And, create Blob container.    
    
    azure storage container create work -a **yournamehol3** -k "**youraccountkey**"

References:
* [Using the Azure CLI with Azure Storage](https://azure.microsoft.com/en-us/documentation/articles/storage-azure-cli/)

## Create a Node.js application

**On your VM in Azure**, clone some app files and install some npm packages such as Node.js SDK for Azure.

    git clone https://github.com/ToruMakabe/HOL_Azure_CLI_Node.git
    
    cd HOL_Azure_CLI_Node/sampleApp/
    
    npm install azure-storage nconf
    
Download or make a large file for upload/download apps evaluation.

Edit config.json to specify your env. (Storage Account, Storage Key, Container Name, File Name)

Upload the file

    node upload.js

Download the file

    node download.js
    
If you would like to evaluate the performance effect of parallelism, you can edit "THREAD_COUNT" param in config.json. After that,

    time node **up/down**.js

Enjoy.

References:
[How to use Blob storage from Node.js](https://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-blob-storage/)

## Other references
* [SDKs](https://azure.microsoft.com/en-us/documentation/)
* [Azure Resoure Manager Overview](https://azure.microsoft.com/en-us/documentation/articles/resource-group-overview/)
* [Azure QuickStart ARM Templates](https://azure.microsoft.com/en-us/documentation/templates/)
* [Create a template deployment](https://msdn.microsoft.com/en-us/library/azure/dn790564.aspx)
* [Azure Storage Explorer](http://storageexplorer.com/)
