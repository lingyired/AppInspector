/*
 * File: app/controller/Layouts.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AI.controller.Layouts', {
    extend: 'Ext.app.Controller',

    requires: [
        'AI.util.extjs.Profile',
        'AI.util.touch.Profile',
        'AI.util.InspectedWindow'
    ],

    models: [
        'Overnested'
    ],
    stores: [
        'Overnested',
        'BoxLayouts'
    ],
    views: [
        'Layouts'
    ],

    init: function(application) {
        var me = this;

        me.control({
            // overnested profile
            'gridpanel#Overnested': {
                'activate': me.onOvernetedProfileActivate,
                'select': me.onSelectOvernestedComponent
            },
            'button#ProfileOvernesting': {
                'click': me.onOvernestedProfileClick
            },
            // nested box layouts
            'gridpanel#BoxLayouts': {
                'activate': me.onNestedBoxLayoutActivate,
                'select': me.onSelectOvernestedComponent
            },
            'button#ProfileBoxLayouts': {
                'click': me.onNestedBoxLayoutsClick
            }
        });
    },

    onOvernetedProfileActivate: function(grid) {
        // load the "Layouts > Overnesting" upfront ...
        var initialLoad = grid.initialLoad,
            btn = grid.down('button#ProfileOvernesting');

        if (!initialLoad && btn) {
            // ... but only once
            grid.initialLoad = true;

            this.onOvernestedProfileClick(btn);
        }
    },

    onOvernestedProfileClick: function(btn) {
        var grid = btn.up('#Overnested'),
            store = grid.getStore();

        store.removeAll();
        grid.setLoading('Profiling for overnested components...');

        var util;

        if (this.getApplication().info.framework === 'ext') {
            util = AI.util.extjs.Profile.getOvernestedComponents;
        }
        else {
            util = AI.util.touch.Profile.getOvernestedComponents;
        }

        AI.util.InspectedWindow.eval(
            util,
            null,
            function (components) {
                Ext.each(components, function (component) {
                    var model = Ext.create('AI.model.Overnested', component);

                    store.add(model);
                });

                grid.setLoading(false);
            }
        );
    },

    onNestedBoxLayoutActivate: function(grid) {
        // load the "Layouts > Box Layouts" upfront ...
        var initialLoad = grid.initialLoad,
            btn = grid.down('button#ProfileBoxLayouts');

        if (!initialLoad && btn) {
            // ... but only once
            grid.initialLoad = true;

            this.onNestedBoxLayoutsClick(btn);
        }
    },

    onNestedBoxLayoutsClick: function(btn) {
        var grid = btn.up('#BoxLayouts'),
            store = grid.getStore();

        store.removeAll();
        grid.setLoading('Profiling for overnested box layouts...');


        var util;

        if (this.getApplication().info.framework === 'ext') {
            util = AI.util.extjs.Profile.getNestedBoxLayouts;
        }
        else {
            util = AI.util.touch.Profile.getNestedBoxLayouts;
        }

        AI.util.InspectedWindow.eval(
            util,
            null,
            function (components) {
                Ext.each(components, function (component) {
                    var model = Ext.create('AI.model.Overnested', component);

                    store.add(model);
                });

                grid.setLoading(false);
            }
        );
    },

    onSelectOvernestedComponent: function(selModel, record, index, eOpts) {
        AI.util.InspectedWindow.eval(
            AI.util.InspectedWindow.highlight,
            record.get('cmpId'),
            Ext.emptyFn
        );
    }

});
