/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

var OpenNewsIndicator = class OpenNewsIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, `${Me.metadata.name} Indicator`, false);
        let icon = new St.Icon({
            gicon: new Gio.ThemedIcon({name: 'view-refresh'}),
            style_class: 'system-status-icon'
        })
        this.add_child(icon);

        let submenu = new PopupMenu.PopupMenuItem('PopupMenuItem');
        this.menu.addMenuItem(submenu);
        let menuItems = this._buildMenu([{ title: "test", summary : "test summary ttttttttttttttttttttttttt\ntttttttttttttttttttttt"}, { title: "test", summary : "test summary"}]);
        for(let item of menuItems){
            this.menu.addMenuItem(item);
        }
    }
    _buildMenu(articles) {
        let menuItems = [];
        for(let article of articles) {
            let box = new St.BoxLayout();
            let articleTitle = new St.Label({
                text: article.title,
                style_class: 'opennews-title'
            });
            let articleSummary = new St.Label({
                text: article.summary,
                style_class: 'opennews-summary'
            })
            box.add_actor(articleTitle);
            box.add_actor(articleSummary);
            let item = new PopupMenu.PopupBaseMenuItem({ reactive : true });
            item.actor.add_actor(box);
            menuItems.push(item);
            menuItems.push( new PopupMenu.PopupSeparatorMenuItem() );
        }
        return menuItems;
    }

}
OpenNewsIndicator = GObject.registerClass(
    {GTypeName: 'OpenNewsIndicator'},
    OpenNewsIndicator
);

function init() {

}

var indicator = null;

function enable() {

    indicator = new OpenNewsIndicator();
    Main.panel.addToStatusArea(`${Me.metadata.name} Indicator`, indicator);
}

function disable() {
    if (indicator !== null) {
        indicator.destroy();
        indicator = null;
    }
}