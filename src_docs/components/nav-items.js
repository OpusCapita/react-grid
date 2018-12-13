import Datagrid from './datagrid/datagrid.component';
import PaginatedDatagrid from './datagrid/paginated-datagrid.component';

export default [
  {
    navLabel: 'Default',
    navKey: 1,
    navPath: '/default',
    navComponent: Datagrid,
  },
  {
    navLabel: 'Paginated',
    navKey: 2,
    navPath: '/paginated',
    navComponent: PaginatedDatagrid,
  },
];
