<?php 
	require_once("conexion.php");

	Class Aulas_Manual extends Conexion{

		public function cboAulas()
	    {
	        $this->Open(2);
	        $this->memoria = $this->con2->query("SELECT aula FROM aulas");
	        $datos=$this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function cboPeriodos(){

	        $sql = "SELECT * FROM curricula ORDER BY perAcademico DESC";
	        $this->Conectar(1);
	        $this->memoria = $this->con1->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function HorarioAula($codAula,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.aulas.capacidad,oeraae2018.aulas.pizarra,oeraae2018.aulas.taburete,oeraae2018.docentes.apePaterno,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres from horariosfim.basehorarios INNER JOIN oeraae2018.aulas ON horariosfim.basehorarios.codAula=oeraae2018.aulas.aula INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente WHERE horariosfim.basehorarios.codAula='$codAula' AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }
	}
?>