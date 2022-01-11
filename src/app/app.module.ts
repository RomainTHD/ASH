import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HistoryComponent} from "./history/history.component";
import {PromptComponent} from "./prompt/prompt.component";

@NgModule({
    declarations: [
        AppComponent,
        PromptComponent,
        HistoryComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatListModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
