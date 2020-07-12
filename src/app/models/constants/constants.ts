import { UserFilter } from '../RequestFilters/UserFIlter';
import { SortType } from 'src/app/enums/enums';

export class Constants {
    public readonly userFilter: UserFilter = {
        propName: "",
        searchString: "",
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
} 