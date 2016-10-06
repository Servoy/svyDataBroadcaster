# svyDataBroadcaster

## About this module
This module is intended to help synchronize Servoy applications when 3rd-party applications have modified the underlying database contents.

When this happens, Servoy clients are not aware of the change. Any data which has been cached will no longer reflect the true state of the database. To compensate for this, svyDataBroadcaster exposes a REST webservices endpoint allowing 3rd-party applications to notify a Servoy Application Server when there has been a change.

## License
This module is released under the MIT License

## Getting Started
Please see the [project wiki](https://github.com/Servoy/svyDataBroadcaster/wiki)
