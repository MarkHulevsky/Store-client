import { UserRequestModel } from '../RequestModels/UserRequestModel';
import { SortType, CurrencyType, PrintingEditionType, OrderStatus } from 'src/app/enums/enums';
import { AuthorRequestModel } from '../RequestModels/AuthorRequestModel';
import { Injectable } from '@angular/core';
import { PrintingEditionRequestModel } from '../RequestModels/PrintingEditionRequestModel';
import { OrderRequestModel } from '../RequestModels/OrderRequestModel';

@Injectable()
export class Constants {

    public readonly EMPTY_STRING = "";

    public readonly DEFAULT_USER_RQUEST_MODEL: UserRequestModel = {
        sortPropertyName: this.EMPTY_STRING,
        searchString: this.EMPTY_STRING,
        paging: {
            currentPage: 0,
            itemsCount: 10
        },
        sortType: SortType.Ascending,
        statuses: [true, false]
    }

    public readonly DEFAULT_AUTHOR_REQUEST_MODEL: AuthorRequestModel = {
        sortPropertyName: this.EMPTY_STRING,
        sortType: SortType.Ascending,
        paging: {
            currentPage: 0,
            itemsCount: 5
        }
    }

    public readonly DEFAULT_PRINTING_EDITION_REQUEST_MODEL: PrintingEditionRequestModel = {
        minPrice: 0,
        maxPrice: 1000,
        paging: {
            currentPage: 0,
            itemsCount: 6
        },
        searchString: this.EMPTY_STRING,
        sortType: SortType.Ascending,
        types: [PrintingEditionType.Book, PrintingEditionType.Magazines, PrintingEditionType.Newspapers]
    }

    public readonly DEFAULT_ORDER_REQUEST_MODEL: OrderRequestModel = {
        orderStatuses: [OrderStatus.Paid, OrderStatus.Unpaid],
        sortPropertyName: this.EMPTY_STRING,
        sortType: SortType.Ascending,
        paging: {
            currentPage: 0,
            itemsCount: 10
        }
    }
    
    public readonly STORAGE_IS_REMEMBER_ME = "isRememberMe";
    public readonly STORAGE_FIRST_NAME = "firstName";
    public readonly STORAGE_LAST_NAME = "lastName";
    public readonly STORAGE_EMAIL = "email";
    public readonly STORAGE_ROLE = "role";
    public readonly ACCESS_TOKEN = "accessToken";
    public readonly REFRESH_TOKEN = "refreshToken";
    public readonly STORAGE_IS_AUTHORIZED = "isAutorized";
    public readonly ACCESS_ERROR = 401;
    public readonly ADMIN_ROLE_NAME = "admin"
    public readonly USER_ROLE_NAME = "user";
    public readonly PRINTING_EDITION_TYPE_STRINGS = ['Book', 'Newspapers', 'Magazines'];
    public readonly CURRENCY_TYPE_STRINGS = ['USD', 'EUR', 'GBP', 'CHF', 'RUB', 'PLN'];
    public readonly ORDER_STATUS_STRINGS = ['Unpaid', 'Paid'];
} 