/**
 * ConversationUserRoute
 *
 * @namespace EmberChat
 * @class ConversationUserRoute
 */
EmberChat.ConversationUserRoute = EmberChat.ConversationUserRoute.extend({

    /**
     * Sets the needed data for the controller
     *
     * @method setupController
     * @param {Ember.Controller} controller
     * @param {EmberChat.Conversation} conversation
     * @param {EmberChat.User} user
     */
    setupController: function(controller, conversation) {
        this._super(controller, conversation);
        if(!conversation.get('content')){
            var message = EmberChat.SettingsMessage.create({
                type: 'requestHistory',
                user: conversation.get('user').get('id')
            });
            EmberChat.MessageProcessor.processOutgoing(message);
        }
    },

    /**
     * Fetches the EmberChat.Conversation for the given id or transition to index route
     *
     * @method model
     * @param {object} params
     * @returns {EmberChat.Conversation|void}
     */
    model: function (params) {
        var conversation = this._super(params);

        if(!conversation) {
            var user = EmberChat.Session.findUserById(params.id);
            if(!user){
                this.transitionTo('index');
                return null;
            }
            conversation = EmberChat.Conversation.create({id: params.id, name: user.get('name'), user: user});
            EmberChat.Session.get('conversations').pushObject(conversation);
        }
        this.controllerFor('conversation').set('conversation', conversation);
        return conversation;
    }



});
