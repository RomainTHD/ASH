import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OutputComponent} from "app/output/output.component";

import {AppComponent} from "./app.component";
import {PromptComponent} from "./prompt/prompt.component";

@NgModule({
    declarations: [
        AppComponent,
        PromptComponent,
        OutputComponent,
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
