<?php

namespace App\Test;

use PHPUnit\Framework\TestCase;

class SimpleTest extends TestCase
{
  public function testAddition()
  {
    $this->assertEquals(expected: 7, actual: 5 + 2, message: '7 was expected for  5 + 2');
  }
}
