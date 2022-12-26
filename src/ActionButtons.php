<?php

namespace Lexicon\ActionButtonSelector;

trait ActionAsButton
{
    public function showInDropdown($show = true) 
    {
        return $this->withMeta(['showInDropdown' => $show]);
    }
}