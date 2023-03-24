<?php

namespace Lexicon\ActionButtonSelector;

trait ActionAsButton
{
    public function showAsButton($show = true)
    {
        return $this->withMeta(['showAsButton' => $show]);
    }
}