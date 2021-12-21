import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {ShellComponent} from "./shell/shell.component";

@NgModule({
    declarations: [
        AppComponent,
        ShellComponent,
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
