import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "app.component";
import {HistoryComponent} from "history/history.component";
import {PromptComponent} from "prompt/prompt.component";

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
