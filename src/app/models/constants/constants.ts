import { UserFilter } from '../RequestFilters/UserFIlter';
import { SortType, Currency, PrintingEditionType } from 'src/app/enums/enums';
import { AuthorFilter } from '../RequestFilters/AuthorFilter';
import { Injectable } from '@angular/core';
import { PrintingEditionFilter } from '../RequestFilters/PrintingEditionFilter';

@Injectable()
export class Constants {
    public readonly emptyString = "";

    public readonly userFilter: UserFilter = {
        propName: this.emptyString,
        searchString: this.emptyString,
        paging: {
            currentPage: 0,
            itemsCount: 10
        },
        sortType: SortType.ascending,
        statuses: [true, false]
    }

    public readonly userRoles = {
        admin: "admin",
        user: "user"
    }

    public readonly authorFilter: AuthorFilter = {
        propName: this.emptyString,
        sortType: SortType.ascending,
        paging: {
            currentPage: 0,
            itemsCount: 5
        }
    }

    public readonly printingEditionFilter: PrintingEditionFilter = {
        currencies: [Currency.UAH, Currency.CHF, Currency.EUR, Currency.GBR, Currency.JPU, Currency.USD],
        minPrice: 0,
        maxPrice: 1000,
        paging: {
            currentPage: 0,
            itemsCount: 6
        },
        searchString: this.emptyString,
        sortType: SortType.ascending,
        types: [PrintingEditionType.Book, PrintingEditionType.Magazines, PrintingEditionType.Newspapers]
    }

    public readonly storageFirstName = "firstName";
    public readonly storageLastName = "lastName";
    public readonly storageEmail = "email";
    public readonly storageRole = "role";
    public readonly accessToken = "accessToken";
    public readonly refreshToken = "refreshToken";
    public readonly accessError = 401;
    public readonly adminRoleName = "admin"
    public readonly isNotRememberMeDateExpire = new Date(0, 0, 0, 12, 0, 0, 0);
    public readonly printingEditionTypeStrings = ['Book', 'Newspapers', 'Magazines'];
    public readonly currencyStrings = ['USD', 'EUR', 'GBR', 'CHF', 'JPU', 'UAH'];
} 