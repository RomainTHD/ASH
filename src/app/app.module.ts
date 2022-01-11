import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {PromptComponent} from "src/app/prompt/prompt.component";

import {AppComponent} from "./app.component";
import {HistoryComponent} from "./history/history.component";

@NgModule({
    declarations: [
        AppComponent,
        PromptComponent,
        HistoryComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
