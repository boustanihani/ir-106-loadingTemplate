MESSAGES = new Mongo.Collection('messages');

if (Meteor.isServer) {

    Meteor.publish("messages", function(options) {
        Meteor._sleepForMs(2000); // 3 sec simulation...
        return MESSAGES.find({});
    });
}

Router.configure({
    layoutTemplate: 'defaultLayout',

    // router-configure-loadingTemplate.meteor.com
    // loadingTemplate: 'loadingTemplate'
});

// router-plugin-loading.meteor.com
Router.plugin('loading', {
    loadingTemplate: 'loadingTemplate',
    // except: ['programmaticWait', 'programmaticSubscribeWait']
});

Router.route('/', {
    template: 'home'
});

Router.route('/declarativeWaitOn', {
    waitOn: function() {
        return Meteor.subscribe('messages', 'optss1');
    }
});

Router.route('/declarativeSubscriptions', {
    subscriptions: function() {
        return Meteor.subscribe('messages', 'optss2');
    }
});

Router.route('/programmaticWait', function() {
    this.wait(Meteor.subscribe('messages', 'optss3'));
    if (this.ready()) {
        this.render('programmaticWait');
    } else {
        this.render('loadingTemplate');
    }
});

Router.route('/programmaticSubscribe', function() {
    this.subscribe('messages', 'optss4');
    if (this.ready()) {
        this.render('programmaticSubscribe');
    } else {
        this.render('loadingTemplate');
    }
});

Router.route('/programmaticSubscribeWait', function() {
    this.subscribe('messages', 'optss5').wait();
    if (this.ready()) {
        this.render('programmaticSubscribeWait');
    } else {
        this.render('loadingTemplate');
    }
});
