import { UserFilter } from '../RequestFilters/UserFIlter';
import { SortType, CurrencyType, PrintingEditionType, OrderStatus } from 'src/app/enums/enums';
import { AuthorFilter } from '../RequestFilters/AuthorFilter';
import { Injectable } from '@angular/core';
import { PrintingEditionFilter } from '../RequestFilters/PrintingEditionFilter';
import { OrderFilter } from '../RequestFilters/OrderFilter';

@Injectable()
export class Constants {

    public readonly emptyString = "";

    public readonly userFilter: UserFilter = {
        sortPropertyName: this.emptyString,
        searchString: this.emptyString,
        paging: {
            currentPage: 0,
            itemsCount: 10
        },
        sortType: SortType.Ascending,
        statuses: [true, false]
    }

    public readonly authorFilter: AuthorFilter = {
        sortPropertyName: this.emptyString,
        sortType: SortType.Ascending,
        paging: {
            currentPage: 0,
            itemsCount: 5
        }
    }

    public readonly printingEditionFilter: PrintingEditionFilter = {
        minPrice: 0,
        maxPrice: 1000,
        paging: {
            currentPage: 0,
            itemsCount: 6
        },
        searchString: this.emptyString,
        sortType: SortType.Ascending,
        types: [PrintingEditionType.Book, PrintingEditionType.Magazines, PrintingEditionType.Newspapers]
    }

    public readonly orderFilter: OrderFilter = {
        orderStatuses: [OrderStatus.Paid, OrderStatus.Unpaid],
        sortPropertyName: this.emptyString,
        sortType: SortType.Ascending,
        paging: {
            currentPage: 0,
            itemsCount: 10
        }
    }
    
    public readonly storageIsRememberMe = "isRememberMe";
    public readonly storageFirstName = "firstName";
    public readonly storageLastName = "lastName";
    public readonly storageEmail = "email";
    public readonly storageRole = "role";
    public readonly accessToken = "accessToken";
    public readonly refreshToken = "refreshToken";
    public readonly storageIsAutorized = "isAutorized";
    public readonly accessError = 401;
    public readonly adminRoleName = "admin"
    public readonly userRoleName = "user";
    public readonly printingEditionTypeStrings = ['Book', 'Newspapers', 'Magazines'];
    public readonly currencyStrings = ['USD', 'EUR', 'GBP', 'CHF', 'RUB', 'PLN'];
    public readonly orderStatusStrings = ['Unpaid', 'Paid'];
} 