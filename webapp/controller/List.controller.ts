import { ListBase$SelectEvent } from "sap/m/ListBase";
import { URLHelper } from "sap/m/library";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import XMLModel from "sap/ui/model/xml/XMLModel";
//@ts-ignore
import * as moment from "moment"; 
import "moment-timezone";
import MessageToast from "sap/m/MessageToast";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace miyasuta.rssreader.controller
 */
export default class List extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this._initializeModel();
    }

    public onSelect(event: ListBase$SelectEvent): void {
        const url = (event.getSource().getSelectedItem().getBindingContext()?.getObject("link/text()") as unknown) as string;
        URLHelper.redirect(url, true);
    }

    public onSyncrhonize(): void {
        this.getView()?.setBusy(true);
        (this.getView()?.getModel() as XMLModel).loadData(this._getFeedUrl());
    }

    public formatTimestamp(timestamp: string): string {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(timeZone);
        const formattedDate = moment.tz(timestamp, timeZone).format("YYYY-MM-DD HH:mm:ss");
        return formattedDate;
    }

    private _initializeModel(): void {
        this.getView()?.setBusy(true);
        //@ts-ignore
        const xmlModel = new XMLModel();
        xmlModel.loadData(this._getFeedUrl());
        // xmlModel.setNameSpace("http://purl.org/dc/elements/1.1/","dc");
        this.getView()?.setModel(xmlModel);
        

        xmlModel.attachRequestCompleted(()=> {
            this.getView()?.setBusy(false);
            const message = ((this.getOwnerComponent()?.getModel("i18n") as ResourceModel)
                            .getResourceBundle() as ResourceBundle)
                            .getText("refreshed") as string;
            MessageToast.show(message);
        })       
    }

    private _getFeedUrl(): string {
        return this._getBaseURL() + '/khhcw49343/rss/Community?interaction.style=blog&feeds.replies=false&count=100';
    }
    
    private _getBaseURL(): string{
        var appId = (this.getOwnerComponent() as UIComponent).getManifestEntry("/sap.app/id");
        var appPath = appId.replaceAll(".", "/");
        //@ts-ignore
        var appModulePath = jQuery.sap.getModulePath(appPath);
        return appModulePath;
    }
}