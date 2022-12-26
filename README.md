# Laravel Nova action button selector
This package allow you to change Nova actions from dropdown to buttons.

## Requirements
- `php: ^8`
- `laravel/nova: ^4`

## How to install
```
composer require lexicon/nova-action-button-selectors
```
Detail page
![example_1](./docs/main_1.jpg)

Index page with [inline action](https://nova.laravel.com/docs/4.0/actions/registering-actions.html#inline-actions)
![example_2](./docs/main_2.jpg)

## Usage

All Nova actions are changed from dropdown to buttons by default.

However, some actions you might need to show as dropdown which is default by Nova.

Add ActionAsButton trait at your Nova action
```
...
use Lexicon\ActionButtonSelector\ActionAsButton;

class NovaAction extends Action
{
    use ActionAsButton, ....;
...
```

Add `showInDropdown()` at your Nova resource
```
...

class NovaResource extends Resource {
...
    public function actions(NovaRequest $request)
    {
        return [
            Actions\NovaAction::make()->showInDropdown()
        ];
        ...
    }
}
```



