<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\MoldesTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\MoldesTable Test Case
 */
class MoldesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\MoldesTable
     */
    protected $Moldes;

    /**
     * Fixtures
     *
     * @var list<string>
     */
    protected array $fixtures = [
        'app.Moldes',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('Moldes') ? [] : ['className' => MoldesTable::class];
        $this->Moldes = $this->getTableLocator()->get('Moldes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    protected function tearDown(): void
    {
        unset($this->Moldes);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     * @link \App\Model\Table\MoldesTable::validationDefault()
     */
    public function testValidationDefault(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
