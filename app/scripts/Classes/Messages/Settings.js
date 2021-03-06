require('scripts/Objects/Messages/Abstract');

/**
 * This class represents all settings messages
 *
 * @class SettingsMessage
 * @namespace EmberChat
 */
EmberChat.SettingsMessage = EmberChat.AbstractMessage.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var user = EmberChat.Session.get('user');
        Ember.assert('Settings message contains no user data!', this.get('user'));
        EmberChat.Session.set('user', EmberChat.User.create(this.get('user')));
        // @TODO for debugging
        Ember.$(document).attr('title', 'EC: ' + EmberChat.Session.get('user').get('name'));
        return true;
    }
});