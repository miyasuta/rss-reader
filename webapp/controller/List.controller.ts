import Controller from "sap/ui/core/mvc/Controller";
import XMLModel from "sap/ui/model/xml/XMLModel";

/**
 * @namespace miyasuta.rssreader.controller
 */
export default class List extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        //@ts-ignore
        const xmlModel = new XMLModel();
        const url = '/community.sap.com/khhcw49343/rss/Community?interaction.style=blog&feeds.replies=false&count=100';
        xmlModel.loadData(url);
    }
}