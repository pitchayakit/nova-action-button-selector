<?php

namespace Lexicon\ActionButtonSelector;

trait ActionButtons
{
    public function showInDropdown($show) {
        return $this->withMeta(['showInDropdown' => true]);
    }
}